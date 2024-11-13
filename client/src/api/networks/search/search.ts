import { publicationsIndex, postHeaders } from "../../../config/api"
import {
  Network,
  NetworkSearchBody,
  NetworkSearchArgs,
  ElasticHits,
  NetworkSearchHitsArgs,
  ElasticAggregations,
} from "../../../types/network"
import { CONFIG } from "../network/config"
import networkCreate from "../network/network"
import configCreate from "../network/config"
import infoCreate from "../network/info"

const CURRENT_YEAR = new Date().getFullYear()
const DEFAULT_YEARS = Array.from({ length: (2010 - CURRENT_YEAR) / -1 + 1 }, (_, i) => CURRENT_YEAR + i * -1)

const DEFAULT_SIZE = 2000
const SEARCH_FIELDS = ["title.*^3", "authors.fullName^3", "summary.*^2", "domains.label.*^2"]
const HIT_FIELDS = ["id", "title.default", "year", "productionType", "isOa", "domains", "cited_by_counts_by_year"]

const networkSearchBody = (model: string, query?: string | unknown): NetworkSearchBody => ({
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
      ],
    },
  },
  aggs: {
    [model]: {
      terms: { field: CONFIG[model].co_aggregation, size: DEFAULT_SIZE },
      aggs: { max_year: { max: { field: "year" } } },
    },
  },
})

export async function networkSearch({ model, query, options, filters }: NetworkSearchArgs): Promise<Network> {
  const body = networkSearchBody(model, query)

  if (filters && filters.length > 0) body.query.bool.filter = filters
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()

  const aggregation = json.aggregations?.[model].buckets
  if (!aggregation?.length) {
    throw new Error(`Elasticsearch error: no co-${model} aggregation found for query ${query}`)
  }

  const computeClusters = options?.computeClusters ?? false
  const lang = options?.lang ?? "fr"
  const network = await networkCreate(query, model, filters, aggregation, computeClusters, lang)
  const config = configCreate(model)
  const info = infoCreate(query, model)

  if (network.items.length < 3) {
    throw new Error(`Network error: need at least three items to display the network (items=${network.items.length})`)
  }

  const data = {
    network: network,
    config: config,
    info: info,
  }

  return data
}

export async function networkSearchHits({ model, query, filters, links }: NetworkSearchHitsArgs): Promise<ElasticHits> {
  const linksFilter = { terms: { [`co_${model}.keyword`]: links } }
  const body = {
    size: DEFAULT_SIZE,
    _source: [...HIT_FIELDS, CONFIG[model].field],
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
        filter: filters.concat(linksFilter),
      },
    },
  }

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((response) => response.json())

  return res?.hits?.hits?.map((hit) => hit._source)
}

export async function networkSearchAggs({
  model,
  query,
  filters,
  links,
}: NetworkSearchHitsArgs): Promise<ElasticAggregations> {
  const linksFilter = { terms: { [`co_${model}.keyword`]: links } }
  const body = {
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
        ],
        filter: filters.concat(linksFilter),
      },
    },
    aggs: {
      publicationsCount: {
        value_count: { field: "id.keyword" },
      },
      publicationsByYear: {
        terms: { field: "year", include: DEFAULT_YEARS, size: DEFAULT_YEARS.length },
      },
      ...DEFAULT_YEARS.reduce(
        (acc, year) => (acc = { ...acc, [`citationsIn${year}`]: { sum: { field: `cited_by_counts_by_year.${year}` } } }),
        {}
      ),
      domains: {
        terms: { field: "domains.label.default.keyword" },
      },
      isOa: {
        terms: { field: "isOa" },
      },
    },
  }

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((response) => response.json())

  return res?.aggregations
}
