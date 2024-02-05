import { publicationTypeMapping } from "../utils/string"
import { publicationsIndex, postHeaders } from "../config/api"
import { Network, NetworkSearchBody, NetworkSearchArgs, NetworkFilterArgs } from "../types/network"
import { PublicationAggregations } from "../types/publication"
import { aggToGraphology } from "./graph"

const DEFAULT_SIZE = 2000
const SEARCH_FIELDS = ["title.*^3", "authors.fullName^3", "summary.*^2", "domains.label.*^2"]

const networkSearchBody = (agg: string, query?: string | unknown): NetworkSearchBody => ({
  size: 0,
  // _source: SEARCH_SOURCE,
  query: {
    bool: {
      must: [
        {
          query_string: {
            query: query || "*",
            fields: SEARCH_FIELDS,
          },
        },
      ],
    },
  },
  aggs: {
    [`byCo${agg}`]: {
      terms: { field: `co_${agg}.keyword`, size: DEFAULT_SIZE },
      aggs: {
        max_year: { max: { field: "year" } },
        ...(agg === "authors" && { agg_domains: { terms: { field: "co_domains.keyword", size: 10 } } }),
      },
    },
  },
})

export async function networkSearch({ agg, query, filters }: NetworkSearchArgs): Promise<Network> {
  const body = networkSearchBody(agg, query)

  if (filters && filters.length > 0) body.query.bool.filter = filters
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((response) => response.json())

  const aggregation = res.aggregations?.[`byCo${agg}`].buckets

  const network = aggToGraphology(aggregation)

  return network
}

export async function networkFilter({ agg, query }: NetworkFilterArgs): Promise<PublicationAggregations> {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: SEARCH_FIELDS,
            },
          },
          {
            exists: { field: `co_${agg}` },
          },
        ],
      },
    },
    aggs: {
      byYear: {
        terms: {
          field: "year",
        },
      },
      byPublicationType: {
        terms: {
          field: "type.keyword",
        },
      },
      byAuthors: {
        terms: {
          field: "authors.id_name.keyword",
          size: 10,
        },
      },
      byIsOa: {
        terms: {
          field: "isOa",
        },
      },
      byFunder: {
        terms: {
          field: "projects.type.keyword",
        },
      },
    },
  }

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((response) => response.json())

  const { aggregations: data } = res

  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count))
  const byYear =
    data?.byYear?.buckets?.map((element) => {
      return {
        value: element.key,
        label: element.key,
        count: (element.doc_count * 100) / _100Year,
      }
    }) || []
  const byType =
    data?.byPublicationType?.buckets
      ?.map((element) => {
        if (!publicationTypeMapping[element?.key]) return null
        return {
          value: element.key,
          label: publicationTypeMapping[element.key],
          count: element.doc_count,
        }
      })
      .filter((el) => el) || []

  const byFunder =
    data?.byFunder?.buckets
      ?.map((element) => {
        return {
          value: element.key,
          label: element.key,
          count: element.doc_count,
        }
      })
      .filter((el) => el) || []

  const byAuthors =
    data?.byAuthors?.buckets
      ?.map((element) => {
        return {
          value: element.key.split("###")?.[0],
          label: element.key.split("###")?.[1],
          count: element.doc_count,
        }
      })
      .filter((el) => el) || []

  const _100IsOa = data?.byIsOa?.buckets && Math.max(...data.byIsOa.buckets.map((el) => el.doc_count))
  const byIsOa =
    data?.byIsOa?.buckets
      ?.map((element) => {
        return {
          value: element.key,
          label: element.key,
          count: (element.doc_count * 100) / _100IsOa,
        }
      })
      .filter((el) => el) || []
  return { byYear, byType, byAuthors, byFunder, byIsOa }
}
