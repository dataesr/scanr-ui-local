import { postHeaders, publicationsIndex } from "../../config/api"
import { ElasticAggregation, ElasticBucket, ElasticBuckets } from "../../types/commons"
import { TrendsArgs } from "../../types/trends"
import { FIELDS } from "../publications/_utils/constants"
import { CONFIG } from "./config"
import { citationsTrends, publicationsTrends } from "./trends"

type TrendsAggregation = Array<ElasticBucket & { model: ElasticAggregation }>

export async function getPublicationsTrends({ model, query, years, filters, normalized }: TrendsArgs) {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          { range: { year: { gte: years[0] } } },
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
      },
    },
    aggs: {
      years: {
        terms: { field: "year", size: years.length },
        aggs: {
          model: { terms: { field: CONFIG[model].field, size: 60000 / years.length } },
        },
      },
    },
  }

  if (filters && filters.length > 0) body.query.bool.filter = filters

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
    console.error(`Elasticsearch error: no aggregation found for years ${years[0]}-${years[years.length - 1]}`)
    return null
  }

  const trends = publicationsTrends(aggregation, years, normalized)
  return trends
}

export async function getCitationsTrends({ model, query, years, filters, normalized }: TrendsArgs) {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          { exists: { field: "cited_by_counts_by_year" } },
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
      },
    },
    aggs: {
      model: {
        terms: { field: CONFIG[model].field, size: 10000 },
        aggs: {
          ...years.reduce(
            (acc, year) => (acc = { ...acc, [`citationsIn${year}`]: { sum: { field: `cited_by_counts_by_year.${year}` } } }),
            {}
          ),
        },
      },
    },
  }

  if (filters && filters.length > 0) body.query.bool.filter = filters

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
    console.error(`Elasticsearch error: no aggregation found for years ${years[0]}-${years[years.length - 1]}`)
    return null
  }

  const trends = citationsTrends(aggregation, years, normalized)
  return trends
}

export async function getPublicationsEvolution({ model, query, years, filters, normalized }: TrendsArgs) {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          { range: { year: { gte: years[0] } } },
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
      },
    },
    aggs: {
      years: {
        terms: { field: "year", size: years.length },
        aggs: {
          model: { terms: { field: CONFIG[model].field, size: 60000 / years.length } },
        },
      },
    },
  }

  if (filters && filters.length > 0) body.query.bool.filter = filters

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
    console.error(`Elasticsearch error: no aggregation found for years ${years[0]}-${years[years.length - 1]}`)
    return null
  }

  const _evolution = aggregation.reduce((acc, bucket) => {
    acc[bucket.key] = bucket?.model?.buckets.slice(0, 5).map((item) => ({
      id: item.key.split("###")[0],
      label: item.key.split("###")?.[1] || item.key.split("###")[0],
      count: item.doc_count,
    }))
    return acc
  }, [])

  const evolution = Object.entries(_evolution).reduce((acc, [year, items]) => {
    items.forEach((item) => {
      acc[item.id] = {
        label: item.label,
        count: { ...acc?.[item.id]?.count, [year]: (acc?.[item.id]?.count?.[year] || 0) + item.count },
      }
    })
    return acc
  }, {})

  console.log("years", years)
  console.log("aggregation", aggregation)
  console.log("items", evolution)

  return evolution
}