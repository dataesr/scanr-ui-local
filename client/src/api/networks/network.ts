import UndirectedGraph from "graphology"
import louvain from "graphology-communities-louvain"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import { Network } from "../../types/network"
import graphGetCommunities from "./communities"
import itemGetDescription from "./description"
import itemGetAggregations from "./aggregations"

export const GRAPH_MAX_ORDER = 300
export const GRAPH_MAX_COMPONENTS = 5

export function createNetwork(aggregation: Array<any>, model: string): Network {
  // Create Graph object
  let graph = new UndirectedGraph()

  aggregation.forEach((item) => {
    const { key, doc_count: count } = item
    const maxYear = item.max_year?.value
    const nodes = key.split("---")

    // Add nodes and compute weight
    nodes.forEach((id) =>
      graph.updateNode(id.split("###")[0], (attr) => ({
        label: id.split("###")[1],
        weight: (attr?.weight ?? 0) + count,
        ...(maxYear && { maxYear: attr?.maxYear ? Math.max(attr.maxYear, maxYear) : maxYear }),
        ...itemGetAggregations(model, item, attr),
      }))
    )

    // Add edges and compute weight
    graph.updateUndirectedEdgeWithKey(key, nodes[0].split("###")[0], nodes[1].split("###")[0], (attr) => ({
      weight: (attr?.weight ?? 0) + count,
      label: `${attr?.weight || 1} links`,
      ...itemGetAggregations(model, item),
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
  louvain.assign(graph)
  const communities = graphGetCommunities(graph, model)

  console.log("Graph nodes", Array.from(graph.nodeEntries()))

  // Create network
  const network = {
    items: graph.mapNodes((key, attr) => ({
      id: key,
      label: attr?.label,
      cluster: (attr?.community ?? 0) + 1,
      weights: { Weight: attr?.weight, Degree: graph.degree(key) },
      scores: { "Last activity": attr?.maxYear },
      description: itemGetDescription(model, key, attr),
    })),
    links: graph.mapEdges((_, attr, source, target) => ({
      source_id: source,
      target_id: target,
      strength: attr?.weight,
    })),
    clusters: communities.map((community) => ({
      cluster: community.index + 1,
      label: community.label,
      size: community.size,
      maxYear: community.maxYear,
      aggs: community.aggs,
    })),
  }

  console.log("network", network)

  return network
}
