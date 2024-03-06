import Graph from "graphology-types"
import louvain from "graphology-communities-louvain"
import { arrayPush, labelClean } from "./utils"
import { networkSearchHits } from "./search"
import { ElasticHits } from "../../types/network"

const communityGetAttribute = (graph: Graph, community: number, name: string): Array<any> =>
  graph.reduceNodes(
    (acc, _, attr) => (attr.community === community && attr?.[name] ? (acc = arrayPush(acc, attr[name])) : acc),
    []
  )

const communityGetLinks = (graph: Graph, community: number): Array<string> => [
  ...new Set(communityGetAttribute(graph, community, "links").flat(1)),
]

const communityGetIds = (graph: Graph, community: number): Array<string> =>
  graph.filterNodes((_, attr) => attr?.community === community)

const communityGetSize = (graph: Graph, community: number): number =>
  graph.filterNodes((_, attr) => attr?.community === community).length

const communityGetMaxYear = (graph: Graph, community: number): number =>
  Math.max(...communityGetAttribute(graph, community, "maxYear"))

const communityGetMaxWeightNodes = (graph: Graph, community: number): Array<string> => {
  const maxWeight = Math.max(...communityGetAttribute(graph, community, "weight"))
  const labels = graph.reduceNodes(
    (acc, _, attr) => (acc = attr?.community === community && attr?.weight === maxWeight ? [...acc, attr.label] : acc),
    []
  )
  return labels
}

const communityGetDomains = (hits: ElasticHits): any =>
  hits.reduce((acc, hit) => {
    if (hit?.domains) {
      hit.domains.forEach(({ label, count }) => {
        const clean = labelClean(label.default)
        acc[clean] = acc[clean] ? acc[clean] + count : count
      })
    }
    return acc
  }, {})

const communityGetOaPercent = (hits: ElasticHits): number =>
  (hits.map((hit) => hit.isOa).filter(Boolean).length / hits.length) * 100

export default async function communitiesCreate(graph: Graph, computeClusters: boolean): Promise<any> {
  const query = graph.getAttribute("query")
  const model = graph.getAttribute("model")

  // Assign communities
  louvain.assign(graph)

  if (!computeClusters) return []

  // Find number of communities
  const count = graph.reduceNodes((acc, _, attr) => Math.max(acc, attr.community), 0) + 1
  if (count < 1) return []

  // Create communities array
  const communities = Promise.all(
    Array.from({ length: count }, async (_, index) => {
      const hits = await networkSearchHits(query, model, communityGetLinks(graph, index))

      const community = {
        index: index,
        label: `Commu ${index}`,
        ids: communityGetIds(graph, index),
        size: communityGetSize(graph, index),
        maxYear: communityGetMaxYear(graph, index),
        maxWeightNodes: communityGetMaxWeightNodes(graph, index),
        ...(hits && {
          domains: communityGetDomains(hits),
          oaPercent: communityGetOaPercent(hits),
          topHits: hits.length,
        }),
      }
      return community
    })
  ).then((c) => c.sort((a, b) => b.size - a.size))

  return communities
}
