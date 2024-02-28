import louvain from "graphology-communities-louvain"
import Graph from "graphology-types"
import { graphGetAggs } from "./models"
// import askOpenAI from "./openai"

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

const communityGetAttribute = (graph: Graph, ids: Array<string>, name: string, n: number) =>
  nodesGetUniqueAttribute(graph, ids, name).slice(0, n).join(", ")

export default function graphGetCommunities(graph: Graph, model: string): Array<any> {
  // Create communities array
  louvain.assign(graph)
  const details = louvain.detailed(graph)
  const communitiesArray = Array.from({ length: details.count }, (_, index) => ({
    ids: graph.filterNodes((_, attr) => attr?.community === index),
  })).sort((a, b) => b.ids.length - a.ids.length)

  // Fill communities
  const communities = communitiesArray.map((community) => ({
    ...community,
    label: `${community.ids.length} ${model}`,
    size: community.ids.length,
    maxYear: Math.max(...nodesGetUniqueAttribute(graph, community.ids, "maxYear")),
    aggs: graphGetAggs(model)?.reduce(
      (acc, { name }) => (acc = { ...acc, [name]: communityGetAttribute(graph, community.ids, name, 5) }),
      {}
    ),
  }))

  // Fill label with openai
  // const communities = await Promise.all(
  //   communitiesArray.map(async (community) => {
  //     const agg = nodesGetAttribute(graph, community.ids, "subAgg")
  //     community.label = await askOpenAI(`Select a word or expression that summarize the best the following list ${agg}`)
  //     return community
  //   })
  // )

  console.log("communities", communities)
  return communities
}
