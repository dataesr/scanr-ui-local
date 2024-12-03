import { postHeaders, publicationsIndex } from "../../../config/api"
import { ElasticAggregation, ElasticBucket, ElasticBuckets, TrendsArgs } from "../../../types/commons"
import { publicationsTrends, citationsTrends } from "../../trends"
import { YEARS, CURRENT_YEAR, MAX_YEAR, MIN_YEAR } from "../../trends/config/years"

type TrendsAggregation = Array<ElasticBucket & { model: ElasticAggregation }>

export async function getPublicationsTrends({ model, normalized }: TrendsArgs) {
  const body: any = {
    size: 0,
    query: { bool: { must: { range: { year: { gte: MIN_YEAR } } } } },
    aggs: {
      years: {
        terms: { field: "year", size: CURRENT_YEAR - MIN_YEAR },
        aggs: {
          model: { terms: { field: `${model}.id_name.keyword`, size: 10000 } },
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
  const aggregation: TrendsAggregation = json?.aggregations?.["years"]?.buckets

  if (!aggregation?.length) {
    console.error(`Elasticsearch error: no aggregation found for years ${MIN_YEAR}-${MAX_YEAR}`)
    return null
  }

  const trends = publicationsTrends(aggregation, normalized)
  return trends
}

export async function getCitationsTrends({ model, normalized }: TrendsArgs) {
  const body: any = {
    size: 0,
    query: { exists: { field: "cited_by_counts_by_year" } },
    aggs: {
      model: {
        terms: { field: `${model}.id_name.keyword`, size: 10000 },
        aggs: {
          ...YEARS.reduce(
            (acc, year) => (acc = { ...acc, [`citationsIn${year}`]: { sum: { field: `cited_by_counts_by_year.${year}` } } }),
            {}
          ),
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
  const aggregation: ElasticBuckets = json?.aggregations?.model?.buckets

  if (!aggregation?.length) {
    console.error(`Elasticsearch error: no aggregation found for years ${MIN_YEAR}-${MAX_YEAR}`)
    return null
  }

  const trends = citationsTrends(aggregation, normalized)
  return trends
}

