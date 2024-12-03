import { ElasticAggregation, ElasticBucket } from "../../types/commons"
import { linearRegressionSlope } from "./_utils/regression"
import { MAX_YEAR } from "./config/years"

const EXCLUDE_WORDS = [""]
const MAX_ITEMS = 15

type TrendsAggregation = Array<ElasticBucket & { domains: ElasticAggregation }>

export default function aggregationToTrends(aggregation: TrendsAggregation, normalized: boolean) {
  // Domains count by year
  const _items: Record<string, Record<string, any>> = aggregation.reduce((acc, bucket) => {
    bucket?.domains?.buckets.forEach((item) => {
      acc[item.key] = {
        ...acc?.[item.key],
        label: item.key,
        count: { ...acc?.[item.key]?.count, [bucket.key]: item.doc_count },
        norm: { ...acc?.[item.key]?.norm, [bucket.key]: item.doc_count / bucket.doc_count },
        sum: (acc?.[item.key]?.sum || 0) + item.doc_count,
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
    item.diff = item.count?.[MAX_YEAR]
      ? (item.count[MAX_YEAR] - (item?.count?.[MAX_YEAR - 1] || 0)) / item.count[MAX_YEAR]
      : 0
  })

  // Sort items by volume
  items.sort((a, b) => (b?.count?.[MAX_YEAR] || 0) - (a?.count?.[MAX_YEAR] || 0))

  // Compute top items
  const topCount = items.slice(0, MAX_ITEMS)
  const topDiff = items.sort((a, b) => b.diff - a.diff).slice(0, MAX_ITEMS)
  const botDiff = items.sort((a, b) => a.diff - b.diff).slice(0, MAX_ITEMS)
  const topSlope = items.sort((a, b) => b.slope - a.slope).slice(0, MAX_ITEMS)
  const botSlope = items.sort((a, b) => a.slope - b.slope).slice(0, MAX_ITEMS)

  const data = {
    "count-top": topCount,
    "diff-top": topDiff,
    "diff-bot": botDiff,
    "trend-top": topSlope,
    "trend-bot": botSlope,
  }

  return data
}
