import { ElasticAggregation, ElasticBucket, ElasticBuckets } from "../../types/commons"
import { linearRegressionSlope } from "./_utils/regression"
import variation from "./_utils/variation"

const EXCLUDE_WORDS = [""]
const ITEMS_PER_PAGE = 25

type TrendsAggregation = Array<ElasticBucket & { [x: string]: ElasticAggregation }>

function computeTrends(data: Array<any>, page: number, years: Array<number>, normalized: boolean, includes: string) {
  const maxYear = years[years.length - 1]
  const minYear = years[0]
  const minItems = (page - 1) * ITEMS_PER_PAGE
  const maxItems = page * ITEMS_PER_PAGE

  // Filter items
  const items = data.filter(({ label }) => !EXCLUDE_WORDS.includes(label))

  // Add linear regression + diff from last year
  items.forEach((item) => {
    const { slope, intercept, r2 } = linearRegressionSlope(item.count, years)
    item.slope = slope
    item.norm_slope = slope / item.sum
    item.intercept = intercept
    item.r2 = r2
    item.variation = variation(item.count, item.sum, minYear, maxYear)
  })

  // Sort items by volume max year
  const sortedItems = items.sort((a, b) => (b?.count?.[maxYear] || 0) - (a?.count?.[maxYear] || 0))

  // Filter labels
  const filteredItems = sortedItems.filter(({ label }: { label: string }) => label.toLowerCase().includes(includes))

  // Compute top items
  const topCount = filteredItems.slice(minItems, maxItems)
  const topSlope = filteredItems
    .slice()
    .sort((a, b) => (normalized ? b.norm_slope - a.norm_slope : b.slope - a.slope))
    .slice(minItems, maxItems)
  const botSlope = filteredItems
    .slice()
    .sort((a, b) => (normalized ? a.norm_slope - b.norm_slope : a.slope - b.slope))
    .slice(minItems, maxItems)

  const trends = {
    ranking: {
      "count-top": topCount,
      "trend-top": topSlope,
      "trend-bot": botSlope,
    },
    searchTotal: sortedItems.length,
    searchPages: Math.ceil(sortedItems.length / ITEMS_PER_PAGE),
    filteredTotal: filteredItems.length,
    filteredPages: Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  }

  return trends
}

export function publicationsTrends(
  aggregation: TrendsAggregation,
  cursor: number,
  years: Array<number>,
  normalized: boolean,
  includes: string
) {
  // Items count by year
  const _items: Record<string, Record<string, any>> = aggregation.reduce((acc, bucket) => {
    bucket?.model?.buckets.forEach((item) => {
      const id = item.key.split("###")[0]
      const label = item.key.split("###")?.[1] || id
      acc[id] = {
        ...acc?.[id],
        id: id,
        label: acc?.[id]?.label || label,
        count: { ...acc?.[id]?.count, [bucket.key]: (acc?.[id]?.count?.[bucket.key] || 0) + item.doc_count },
        sum: (acc?.[id]?.sum || 0) + item.doc_count,
      }
    })
    return acc
  }, {})
  const items = Object.values(_items)

  const trends = computeTrends(items, cursor, years, normalized, includes)
  return trends
}

export function citationsTrends(
  aggregation: ElasticBuckets,
  cursor: number,
  years: Array<number>,
  normalized: boolean,
  includes: string
) {
  // Items citations count by year
  const _items: Record<string, Record<string, any>> = aggregation.reduce((acc, item) => {
    years.forEach((year) => {
      const id = item.key.split("###")[0]
      const label = item.key.split("###")?.[1] || id
      const citationsCount = item?.[`citationsIn${year}`]?.value
      acc[id] = {
        ...acc?.[id],
        id: id,
        label: acc?.[id]?.label || label,
        count: { ...acc?.[id]?.count, ...(citationsCount && { [year]: (acc?.[id]?.count?.[year] || 0) + citationsCount }) },
        sum: (acc?.[id]?.sum || 0) + citationsCount,
      }
    })
    return acc
  }, {})
  const items = Object.values(_items)

  const trends = computeTrends(items, cursor, years, normalized, includes)
  return trends
}