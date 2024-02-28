import UndirectedGraph from "graphology"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import { NetworkData, NetworkHits } from "../../types/network"
import createCommunities from "./communities"
import itemGetDescription from "./description"

export const GRAPH_MAX_ORDER = 300
export const GRAPH_MAX_COMPONENTS = 5

const nodeConcatMaxYear = (nodeMaxYear: number, maxYear: number) => (nodeMaxYear ? Math.max(nodeMaxYear, maxYear) : maxYear)
const nodeConcatTopHits = (nodeTopHits: NetworkHits, topHits: Array<any>): NetworkHits => {
  const topHitsIds = topHits.map((hit) => hit._id)
  const concatIds = nodeTopHits ? [...new Set([...nodeTopHits, ...topHitsIds])] : topHitsIds
  return concatIds
}
// const nodeConcatTopHits = (nodeTopHits: NetworkHits, topHits: Array<any>): NetworkHits => {
//   const topHitsSource = topHits.map((hit) => aggExtractHit(hit?._source))
//   const concat = nodeTopHits
//     ? [...new Map(nodeTopHits.concat(topHitsSource).map((hit) => [hit.id, hit])).values()]
//     : topHitsSource
//   return concat
// }

// function networkUpdate(network: NetworkData, hits: any): NetworkData {
//   // Update nodes with hits info
//   network.items.map((item) => {
//     const topHits = item?.topHits?.map((id) => aggExtractHit(hits.find((hit) => (hit._id = id))._source))
//     item.test = topHits?.length ?? 99
//   })
//   return network
// }

export default async function networkCreate(aggregation: Array<any>, model: string): Promise<NetworkData> {
  // Create Graph object
  let graph = new UndirectedGraph()

  aggregation.forEach((item) => {
    const { key, doc_count: count } = item
    const maxYear = item.max_year?.value
    const topHits = item.top_hits?.hits?.hits
    const nodes = key.split("---")

    // Add nodes and compute weight
    nodes.forEach((id: string) =>
      graph.updateNode(id.split("###")[0], (attr) => ({
        label: id.split("###")[1],
        weight: (attr?.weight ?? 0) + count,
        ...(maxYear && { maxYear: nodeConcatMaxYear(attr?.maxYear, maxYear) }),
        ...(topHits && { topHits: nodeConcatTopHits(attr?.topHits, topHits) }),
        // ...itemGetAggregations(model, item, attr),
      }))
    )

    // Add edges and compute weight
    graph.updateUndirectedEdgeWithKey(key, nodes[0].split("###")[0], nodes[1].split("###")[0], (attr) => ({
      weight: (attr?.weight ?? 0) + count,
      label: `${attr?.weight || 1} links`,
      // ...itemGetAggregations(model, item),
    }))
  })

  console.log(`Graph items=${graph.order}, links=${graph.size}, components=${connectedComponents(graph).length}`)

  // Keep only largests components
  const sortedComponents = connectedComponents(graph).sort((a, b) => b.length - a.length)
  let numberOfComponents = GRAPH_MAX_COMPONENTS
  graph = subgraph(graph, sortedComponents.slice(0, numberOfComponents).flat())
  while (graph.order > GRAPH_MAX_ORDER && numberOfComponents > 1) {
    numberOfComponents -= 1
    graph = subgraph(graph, sortedComponents.slice(0, numberOfComponents).flat())
  }
  console.log(`Components graph items=${graph.order}, links=${graph.size}, components=${connectedComponents(graph).length}`)

  // Filter with minimal number of nodes
  // let nodeWeightThresh = 1
  // while (graph.order > GRAPH_MAX_ORDER) {
  //   nodeWeightThresh += 1
  //   graph = subgraph(graph, (_, attr) => attr?.weight >= nodeWeightThresh) // eslint-disable-line no-loop-func
  // }

  // console.log(`Filtered graph items=${graph.order}, links=${graph.size}, components=${connectedComponents(graph).length}`)

  // Filter with minimal number of edges
  // let edgeWeightThresh = 1
  // while (graph.size / graph.order > GRAPH_MAX_RATIO) {
  //   edgeWeightThresh += 1
  //   graph.filterEdges((edge, attr) => attr?.weight < edgeWeightThresh).forEach((edge) => graph.dropEdge(edge)) // eslint-disable-line no-loop-func
  //   graph = subgraph(graph, (node) => graph.degree(node) > 0) // eslint-disable-line no-loop-func
  // }
  // console.log("Edge weight threshold :", edgeWeightThresh)

  // Add communities
  const communities = await createCommunities(graph)

  // console.log("Graph nodes", Array.from(graph.nodeEntries()))

  // Create network
  const network = {
    items: graph.mapNodes((key, attr) => ({
      id: key,
      label: attr?.label,
      cluster: attr.community + 1,
      weights: { Weight: attr.weight, Degree: graph.degree(key), ...(attr?.topHits && { TopHits: attr.topHits.length }) },
      scores: { "Last activity": attr?.maxYear },
      topHits: attr?.topHits,
      description: itemGetDescription(model, key, attr),
    })),
    links: graph.mapEdges((_, attr, source, target) => ({
      source_id: source,
      target_id: target,
      strength: attr?.weight,
    })),
    clusters: communities.map((community) => ({
      ...community,
      cluster: community.index + 1,
    })),
  }

  console.log("network", network)

  return network
}
