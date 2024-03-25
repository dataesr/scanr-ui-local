import { publicationsIndex, postHeaders } from "../../../config/api"
import { Network, NetworkSearchBody, NetworkSearchArgs, ElasticHits } from "../../../types/network"
import networkCreate from "../network/network"
import configCreate from "../network/config"
import infoCreate from "../network/info"

const DEFAULT_SIZE = 2000
const SEARCH_FIELDS = ["title.*^3", "authors.fullName^3", "summary.*^2", "domains.label.*^2"]
const HIT_FIELDS = ["id", "title.default", "year", "productionType", "isOa", "domains"]

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
      terms: { field: `co_${model}.keyword`, size: DEFAULT_SIZE },
      aggs: { max_year: { max: { field: "year" } } },
    },
  },
})

export async function networkSearch({ model, query, options, filters }: NetworkSearchArgs): Promise<Network> {
  const body = networkSearchBody(model, query)

  if (filters && filters.length > 0) body.query.bool.filter = filters
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }
  console.log("networkSearch", body)

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`);
  }
  const json = await res.json()
  console.log("endOfSearch", json)

  const aggregation = json.aggregations?.[model].buckets
  if (!aggregation?.length) {
    throw new Error(`Elasticsearch error: no co-${model} aggregation found for query ${query}`)
  }

  const computeClusters = options?.computeClusters ?? false
  const network = await networkCreate(query, model, aggregation, computeClusters)
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

  console.log("data", data)
  return data
}

export async function networkSearchHits(query: string, model: string, links: Array<string>): Promise<ElasticHits> {
  const body = {
    size: DEFAULT_SIZE,
    _source: HIT_FIELDS,
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
        filter: {
          terms: {
            [`co_${model}.keyword`]: links,
          },
        },
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
