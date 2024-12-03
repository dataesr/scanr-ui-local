import { postHeaders, publicationsIndex } from "../../../config/api"
import { ElasticAggregation, ElasticBucket } from "../../../types/commons"
import { linearRegressionSlope } from "./_utils"

const CURRENT_YEAR = new Date().getFullYear()
const MAX_YEAR = CURRENT_YEAR - 1
const MIN_YEAR = MAX_YEAR - 5
const EXCLUDE_WORDS = [""]
export const YEARS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i)

type TrendsAggregation = Array<ElasticBucket & { domains: ElasticAggregation }>

const aggregationToTrends = (aggregation: TrendsAggregation) => {
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
  const topCount = domains.sort((a, b) => (b?.count?.[MAX_YEAR] || 0) - (a?.count?.[MAX_YEAR] || 0)).slice(0, 10)
  const topDiff = domains.sort((a, b) => b.diff - a.diff).slice(0, 10)
  const botDiff = domains.sort((a, b) => a.diff - b.diff).slice(0, 10)
  const topSlope = domains.sort((a, b) => b.slope - a.slope).slice(0, 10)
  const botSlope = domains.sort((a, b) => a.slope - b.slope).slice(0, 10)

  return { count: topCount, byDiff: { top: topDiff, bot: botDiff }, bySlope: { top: topSlope, bot: botSlope } }
}

export default async function getPublicationsTrends() {
  const body: any = {
    size: 0,
    query: { bool: { must: { range: { year: { gte: MIN_YEAR } } } } },
    aggs: {
      years: {
        terms: { field: "year", size: CURRENT_YEAR - MIN_YEAR },
        aggs: {
          domains: { terms: { field: "domains.naturalKey.keyword", size: 10000 } },
        },
      },
    },
  }

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })

  if (res.status !== 200) {
    console.error(`Elasticsearch error: ${res.status}`)
    return null
  }

  const json = await res.json()
  const aggregation: TrendsAggregation = json.aggregations?.["years"]?.buckets

  if (!aggregation?.length) {
    console.error(`Elasticsearch error: no aggregation found for years ${MIN_YEAR}-${MAX_YEAR}`)
    return null
  }

  const data = aggregationToTrends(aggregation)

  return data
}
