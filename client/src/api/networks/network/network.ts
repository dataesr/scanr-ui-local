import UndirectedGraph from "graphology"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import random from "graphology-layout/random"
import forceAtlas2 from "graphology-layout-forceatlas2"
import { NetworkData } from "../../../types/network"
import communitiesCreate from "./communities"
import { configGetItemUrl } from "./config"

export const GRAPH_MAX_ORDER = 300
export const GRAPH_MAX_COMPONENTS = 5

const nodeConcatMaxYear = (nodeMaxYear: number, maxYear: number) => (nodeMaxYear ? Math.max(nodeMaxYear, maxYear) : maxYear)

export default async function networkCreate(
  query: string,
  model: string,
  aggregation: Array<any>,
  computeClusters: boolean
): Promise<NetworkData> {
  // Create Graph object
  let graph = new UndirectedGraph()
  graph.setAttribute("query", query)
  graph.setAttribute("model", model)

  aggregation.forEach((item) => {
    const { key, doc_count: count } = item
    const maxYear = item.max_year?.value
    const nodes = key.split("---")

    // Add nodes and compute weight
    nodes.forEach((id: string) =>
      graph.updateNode(id.split("###")[0], (attr) => ({
        label: id.split("###")[1] ?? id,
        weight: (attr?.weight ?? 0) + count,
        links: attr?.links ? [...attr.links, key] : [key],
        ...(maxYear && { maxYear: nodeConcatMaxYear(attr?.maxYear, maxYear) }),
      }))
    )

    // Add edges and compute weight
    graph.updateUndirectedEdgeWithKey(key, nodes[0].split("###")[0], nodes[1].split("###")[0], (attr) => ({
      weight: (attr?.weight ?? 0) + count,
      label: `${attr?.weight || 1} links`,
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

  // Add forceAtlas layout
  random.assign(graph) // Needs a starting layout for forceAtlas to work
  const sensibleSettings = forceAtlas2.inferSettings(graph)
  forceAtlas2.assign(graph, { iterations: 100, settings: sensibleSettings })
  console.log("Atlas2 settings", sensibleSettings)

  // Add communities
  const communities = await communitiesCreate(graph, computeClusters)

  console.log("Communities", communities)
  console.log("Graph nodes", Array.from(graph.nodeEntries()))

  // Create network
  const network = {
    items: graph.mapNodes((key, attr) => ({
      id: key,
      x: attr.x,
      y: attr.y,
      label: attr.label,
      cluster: attr.community + 1,
      weights: { Weight: attr.weight, Degree: graph.degree(key) },
      scores: { "Last activity": attr?.maxYear },
      page: configGetItemUrl(model, key, attr),
    })),
    links: graph.mapEdges((_, attr, source, target) => ({
      source_id: source,
      target_id: target,
      strength: attr?.weight,
    })),
    ...(communities && {
      clusters: communities.map((community) => ({
        ...community,
        cluster: community.index + 1,
      })),
    }),
  }

  console.log("network", network)

  return network
}
