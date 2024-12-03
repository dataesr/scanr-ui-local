import { ElasticAggregation, ElasticBucket } from "../../types/commons"
import { linearRegressionSlope } from "./_utils/regression"
import variation from "./_utils/variation"
import { MAX_YEAR } from "./config/years"

const EXCLUDE_WORDS = [""]
const MAX_ITEMS = 15

type TrendsAggregation = Array<ElasticBucket & { domains: ElasticAggregation }>

export default function aggregationToTrends(aggregation: TrendsAggregation, normalized: boolean) {
  console.log("aggregation", aggregation)

  // Domains count by year
  const _items: Record<string, Record<string, any>> = aggregation.reduce((acc, bucket) => {
    bucket?.domains?.buckets.forEach((item) => {
      const [id, label] = item.key.split("###")
      acc[id] = {
        ...acc?.[id],
        id: id,
        label: acc?.[id]?.label || label,
        count: { ...acc?.[id]?.count, [bucket.key]: (acc?.[id]?.count?.[bucket.key] || 0) + item.doc_count },
        norm: { ...acc?.[id]?.norm, [bucket.key]: (acc?.[id]?.norm?.[bucket.key] || 0) + item.doc_count / bucket.doc_count },
        sum: (acc?.[id]?.sum || 0) + item.doc_count,
      }
    })
    return acc
  }, {})
  const items = Object.values(_items).filter(({ label }) => !EXCLUDE_WORDS.includes(label))

  // Add linear regression + diff from last year
  items.forEach((item) => {
    const { slope, intercept } = linearRegressionSlope(normalized ? item.norm : item.count)
    item.slope = normalized ? slope / item.sum : slope
    item.intercept = intercept
    item.diff = variation(item.count)
  })

  // Sort items by volume max year
  const sortedItems = items.sort((a, b) => (b?.count?.[MAX_YEAR] || 0) - (a?.count?.[MAX_YEAR] || 0))

  // Compute top items
  const topCount = sortedItems.slice(0, MAX_ITEMS)
  const topDiff = sortedItems
    .slice()
    .sort((a, b) => b.diff - a.diff)
    .slice(0, MAX_ITEMS)
  const botDiff = sortedItems
    .slice()
    .sort((a, b) => (b?.count?.[MAX_YEAR - 1] || 0) - (a?.count?.[MAX_YEAR - 1] || 0))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, MAX_ITEMS)
  const topSlope = sortedItems
    .slice()
    .sort((a, b) => b.slope - a.slope)
    .slice(0, MAX_ITEMS)
  const botSlope = sortedItems
    .slice()
    .sort((a, b) => a.slope - b.slope)
    .slice(0, MAX_ITEMS)

  const data = {
    "count-top": topCount,
    "diff-top": topDiff,
    "diff-bot": botDiff,
    "trend-top": topSlope,
    "trend-bot": botSlope,
  }

  return data
}
