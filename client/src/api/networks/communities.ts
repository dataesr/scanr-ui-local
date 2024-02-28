import Graph from "graphology-types"
import { graphGetAggs } from "./models"

const nodesGetUniqueAttribute = (graph: Graph, ids: Array<string>, name: string) =>
  ids.reduce((acc, id) => {
    const attribute = graph.getNodeAttribute(id, name)
    if (!attribute) return acc
    if (typeof attribute === "object")
      if (Array.isArray(attribute)) {
        acc.push(...attribute)
      } else {
        acc.push(...Object.keys(attribute))
      }
    else {
      acc.push(attribute)
    }
    return Array.from(new Set(acc))
  }, [])

const nodesGetMaxAttribute = (graph: Graph, ids: Array<string>, name: string) => {
  const maxElement = ids.reduce(
    (acc, id) => {
      const value = graph.getNodeAttribute(id, name)
      const label = graph.getNodeAttribute(id, "label")
      if (value > acc.value) {
        acc.value = value
        acc.labels = [label]
      }
      if (value === acc.value) {
        acc.labels.concat(label)
      }
      return acc
    },
    { value: 0, labels: [] }
  )

  return maxElement.labels
}

const communityGetAttribute = (graph: Graph, ids: Array<string>, name: string, n = 0) =>
  n > 0
    ? nodesGetUniqueAttribute(graph, ids, name).slice(0, n).join(", ")
    : nodesGetUniqueAttribute(graph, ids, name).join(", ")

const communityGetMaxAttribute = (graph: Graph, ids: Array<string>, name: string) => nodesGetMaxAttribute(graph, ids, name)

export default function graphGetCommunities(graph: Graph, model: string): Array<any> {
  // Find number of communities
  const count = graph.reduceNodes((acc, _, attr) => Math.max(acc, attr.community), 0) + 1

  // Create communities array
  let communities = Array.from({ length: count }, (_, index) => ({
    index: index,
    ids: graph.filterNodes((_, attr) => attr?.community === index),
  })).sort((a, b) => b.ids.length - a.ids.length) as Array<any>

  // Fill communities
  communities = communities.map((community) => ({
    ...community,
    label: `${community.ids.length} ${model}`,
    size: community.ids.length,
    maxYear: Math.max(...nodesGetUniqueAttribute(graph, community.ids, "maxYear")),
    aggs: graphGetAggs(model)?.reduce(
      (acc, { name }) => (acc = { ...acc, [name]: communityGetAttribute(graph, community.ids, name, 10) }),
      {}
    ),
    topElement: communityGetMaxAttribute(graph, community.ids, "weight"),
  }))

  console.log("communities", communities)
  return communities
}
