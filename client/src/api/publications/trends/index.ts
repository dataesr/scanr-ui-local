import { postHeaders, publicationsIndex } from "../../../config/api"
import { ElasticAggregation, ElasticBucket, TrendsArgs } from "../../../types/commons"
import aggregationToTrends from "../../trends"
import { CURRENT_YEAR, MAX_YEAR, MIN_YEAR } from "../../trends/config/years"

type TrendsAggregation = Array<ElasticBucket & { domains: ElasticAggregation }>

export default async function getPublicationsTrends({ normalized }: TrendsArgs) {
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

  const data = aggregationToTrends(aggregation, normalized)

  return data
}
