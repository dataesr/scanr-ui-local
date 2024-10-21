import Graph from "graphology-types"
import louvain from "graphology-communities-louvain"
import seedrandom from "seedrandom"
import { arrayPush, labelClean } from "../_utils/functions"
import { networkSearchHits, networkSearchAggs } from "../search/search"
import { ElasticAggregations, ElasticHits, NetworkCommunities, NetworkFilters } from "../../../types/network"
import { openAiLabeledClusters } from "./mistralai"
import { COLORS } from "../_utils/constants"
import { GetColorName } from "hex-color-to-color-name"
import { configGetItemUrl } from "./config"
import { CONFIG } from "./config"
import { nodeGetId } from "./network"

const CURRENT_YEAR = new Date().getFullYear()
const RECENT_YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR]

const communityGetAttribute = (graph: Graph, community: number, name: string): Array<string> | Array<number> =>
  graph.reduceNodes(
    (acc, _, attr) => (attr.community === community && attr?.[name] ? (acc = arrayPush(acc, attr[name])) : acc),
    []
  )

const communityGetLinks = (graph: Graph, community: number): Array<string> => [
  ...new Set(communityGetAttribute(graph, community, "links").flat(1).map(String)),
]

const communityGetIds = (graph: Graph, community: number): Array<string> =>
  graph.filterNodes((_, attr) => attr?.community === community)

const communityGetSize = (graph: Graph, community: number): number =>
  graph.filterNodes((_, attr) => attr?.community === community).length

const communityGetMaxYear = (graph: Graph, community: number): number =>
  Math.max(...communityGetAttribute(graph, community, "maxYear").map(Number))

const communityGetNodes = (graph: Graph, community: number): Array<{ id: string; weight: number; label: string }> => {
  const ids = communityGetIds(graph, community)
  const nodes = ids.map((id) => ({
    id: id,
    weight: graph.getNodeAttribute(id, "weight"),
    label: graph.getNodeAttribute(id, "label"),
    url: configGetItemUrl(graph.getAttribute("model"), id, graph.getNodeAttribute(id, "label")),
  }))
  return nodes.sort((a, b) => b.weight - a.weight)
}

const communityGetPublicationsCount = (aggs: ElasticAggregations): number =>
  aggs?.publicationsByYear?.buckets.reduce((acc, bucket) => acc + bucket.doc_count, 0) +
  aggs?.publicationsByYear?.sum_other_doc_count

const communityGetPublicationsByYear = (aggs: ElasticAggregations): Record<string, number> =>
  aggs?.publicationsByYear?.buckets.reduce((acc, bucket) => ({ ...acc, [bucket.key]: bucket.doc_count }), {})

const communityGetCitationsByYear = (aggs: ElasticAggregations): Record<string, number> =>
  Object.entries(aggs)
    .filter(([key]) => key.startsWith("citationsIn"))
    .reduce((acc, [key, value]) => ({ ...acc, [key.slice(-4)]: value?.value }), {})

const communityGetCitationsCount = (aggs: ElasticAggregations): number =>
  Object.values(communityGetCitationsByYear(aggs)).reduce((acc, value) => acc + value, 0)

const communityGetCitationsRecent = (aggs: ElasticAggregations): number =>
  Object.entries(communityGetCitationsByYear(aggs)).reduce(
    (acc, [key, value]) => (RECENT_YEARS.includes(Number(key)) ? acc + value : acc),
    0
  )

const communityGetCitationsScore = (aggs: ElasticAggregations): number =>
  communityGetCitationsRecent(aggs) / communityGetPublicationsCount(aggs)

const communityGetDomains = (aggs: ElasticAggregations): Record<string, number> =>
  aggs?.domains?.buckets.reduce((acc, bucket) => ({ ...acc, [labelClean(bucket.key)]: bucket.doc_count }), {})

const communityGetOaPercent = (aggs: ElasticAggregations): number => {
  const isOa = aggs?.isOa?.buckets.find((bucket) => bucket.key_as_string === "true")?.doc_count || 0
  const isNotOa = aggs?.isOa?.buckets.find((bucket) => bucket.key_as_string === "false")?.doc_count || 0
  return (isOa / (isOa + isNotOa || 1)) * 100
}

const communityGetPublications = (hits: ElasticHits): Array<Record<string, string>> =>
  hits.map((hit) => ({
    id: hit.id,
    title: hit.title.default,
  }))

const communityGetNodesInfos = (hits: ElasticHits, model: string): any =>
  hits.reduce((acc, hit) => {
    const field = CONFIG[model].field.split(".")[0]
    const citationsByYear = hit?.["cited_by_counts_by_year"]
    hit?.[field].forEach((node) => {
      const key = node[CONFIG[model].field.split(".")[1]]
      if (!key) return
      const id = nodeGetId(key)
      acc[id] = {
        ...acc?.[id],
        publicationsCount: acc?.[id]?.publicationsCount ? acc[id].publicationsCount + 1 : 1,
        citationsByYear: citationsByYear,
      }
    })
    return acc
  }, {})

const nodeGetCitationsCount = (citationsByYear: Record<string, number>): number =>
  citationsByYear ? Object.values(citationsByYear).reduce((acc: number, value: number) => acc + value, 0) : 0

const nodeGetCitationsRecent = (citationsByYear: Record<string, number>): number =>
  citationsByYear ? (citationsByYear?.[CURRENT_YEAR - 1] || 0) + (citationsByYear?.[CURRENT_YEAR] || 0) : 0

export default async function communitiesCreate(graph: Graph, computeClusters: boolean): Promise<NetworkCommunities> {
  const query: string = graph.getAttribute("query")
  const model: string = graph.getAttribute("model")
  const filters: NetworkFilters = graph.getAttribute("filters")

  // Assign communities
  const randomSeed = query + model + JSON.stringify(filters)
  louvain.assign(graph, { rng: seedrandom(randomSeed) })

  if (!computeClusters) return []

  // Find number of communities
  const count = graph.reduceNodes((acc, _, attr) => Math.max(acc, attr.community), 0) + 1
  if (count < 1) return []

  // Create communities array
  const communities = Promise.all(
    Array.from({ length: count }, async (_, index) => {
      // Get elastic data
      const hits = await networkSearchHits({ model, query, filters, links: communityGetLinks(graph, index) })
      const aggs = await networkSearchAggs({ model, query, filters, links: communityGetLinks(graph, index) })

      // Add info to nodes
      if (hits) {
        const nodesInfos = communityGetNodesInfos(hits, model)
        graph.forEachNode((key) => {
          if (!Object.keys(nodesInfos).includes(key)) return
          const nodeInfos = nodesInfos[key]
          const nodeCitationsByYear = nodeInfos?.citationsByYear
          const nodePublicationsCount = nodeInfos.publicationsCount
          const nodeCitationsCount = nodeGetCitationsCount(nodeCitationsByYear)
          const nodeCitationsRecent = nodeGetCitationsRecent(nodeCitationsByYear)
          const nodeCitationsScore = nodeCitationsRecent / (nodePublicationsCount || 1)
          graph.setNodeAttribute(key, "publicationsCount", nodePublicationsCount)
          graph.setNodeAttribute(key, "citationsCount", nodeCitationsCount)
          graph.setNodeAttribute(key, "citationsRecent", nodeCitationsRecent)
          graph.setNodeAttribute(key, "citationsScore", nodeCitationsScore)
        })
      }

      // Add info to communities
      const community = {
        cluster: index + 1,
        label: COLORS?.[index] ? GetColorName(COLORS[index]) : `Unnamed ${index + 1}`,
        color: COLORS?.[index] ?? "#e2e2e2",
        size: communityGetSize(graph, index),
        nodes: communityGetNodes(graph, index),
        maxYear: communityGetMaxYear(graph, index),
        ...(aggs && {
          publicationsByYear: communityGetPublicationsByYear(aggs),
          publicationsCount: communityGetPublicationsCount(aggs),
          citationsByYear: communityGetCitationsByYear(aggs),
          citationsCount: communityGetCitationsCount(aggs),
          citationsRecent: communityGetCitationsRecent(aggs),
          citationsScore: communityGetCitationsScore(aggs),
          domains: communityGetDomains(aggs),
          oaPercent: communityGetOaPercent(aggs),
        }),
        ...(hits && {
          publications: communityGetPublications(hits),
        }),
      }
      return community
    })
  ).then((c) => c.sort((a, b) => b.size - a.size))

  // Add labels with IA
  const labeledCommunities = await openAiLabeledClusters(await communities)

  if (labeledCommunities) return labeledCommunities

  return communities
}
