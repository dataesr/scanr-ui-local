import { ElasticAggregation, ElasticBucket } from "../../types/commons"
import { linearRegressionSlope } from "./_utils/regression"
import { MAX_YEAR } from "./config/years"

const EXCLUDE_WORDS = [""]
const MAX_ITEMS = 15

type TrendsAggregation = Array<ElasticBucket & { domains: ElasticAggregation }>

export default function aggregationToTrends(aggregation: TrendsAggregation) {
  // Domains count by year
  const _domains: Record<string, Record<string, any>> = aggregation.reduce((acc, bucket) => {
    bucket?.domains?.buckets.forEach((domain) => {
      acc[domain.key] = {
        ...acc?.[domain.key],
        label: domain.key,
        count: { ...acc?.[domain.key]?.count, [bucket.key]: domain.doc_count },
        norm: { ...acc?.[domain.key]?.norm, [bucket.key]: domain.doc_count / bucket.doc_count },
        sum: (acc?.[domain.key]?.sum || 0) + domain.doc_count,
      }
    })
    return acc
  }, {})
  const domains = Object.values(_domains).filter(({ label }) => !EXCLUDE_WORDS.includes(label))

  // Add linear regression + diff from last year
  domains.forEach((domain) => {
    const { slope, intercept } = linearRegressionSlope(domain.norm)
    domain.slope = slope
    domain.intercept = intercept
    domain.diff = domain.count?.[MAX_YEAR]
      ? (domain.count[MAX_YEAR] - (domain?.count?.[MAX_YEAR - 1] || 0)) / domain.count[MAX_YEAR]
      : 0
  })

  // Compute top domains
  const topCount = domains.sort((a, b) => (b?.count?.[MAX_YEAR] || 0) - (a?.count?.[MAX_YEAR] || 0)).slice(0, MAX_ITEMS)
  const topDiff = domains.sort((a, b) => b.diff - a.diff).slice(0, MAX_ITEMS)
  const botDiff = domains.sort((a, b) => a.diff - b.diff).slice(0, MAX_ITEMS)
  const topSlope = domains.sort((a, b) => b.slope - a.slope).slice(0, MAX_ITEMS)
  const botSlope = domains.sort((a, b) => a.slope - b.slope).slice(0, MAX_ITEMS)

  return { "count-top": topCount, "diff-top": topDiff, "diff-bot": botDiff, "trend-top": topSlope, "trend-bot": botSlope }
}
