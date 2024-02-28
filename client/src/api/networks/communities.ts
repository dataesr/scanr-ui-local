import Graph from "graphology-types"
import { Communities } from "../../types/network"
import { arrayPush } from "./utils"

const communityGetAttribute = (graph: Graph, community: number, name: string): Array<any> =>
  graph.reduceNodes(
    (acc, _, attr) => (attr.community === community && attr?.[name] ? (acc = arrayPush(acc, attr[name])) : acc),
    []
  )

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

const communityGetDomains = (graph: Graph, community: number): any => {
  const topHits = [...new Map(communityGetAttribute(graph, community, "topHits").map((hit) => [hit.id, hit])).values()] // Unique publications
  const domains = topHits.reduce((acc, hit) => {
    if (hit?.domains) Object.entries(hit.domains).forEach(([key, value]) => (acc[key] = acc[key] ? acc[key] + value : value))
    return acc
  }, {})
  return domains
}

export default function createCommunities(graph: Graph): Communities {
  // Find number of communities
  const count = graph.reduceNodes((acc, _, attr) => Math.max(acc, attr.community), 0) + 1

  // Create communities array
  const communities = Array.from({ length: count }, (_, index) => ({
    index: index,
    label: `Community ${index}`,
    ids: communityGetIds(graph, index),
    size: communityGetSize(graph, index),
    maxYear: communityGetMaxYear(graph, index),
    maxWeightNodes: communityGetMaxWeightNodes(graph, index),
    domains: communityGetDomains(graph, index),
  }))

  // Sort communities
  communities.sort((a, b) => b.size - a.size)

  console.log("communities", communities)
  return communities
}
