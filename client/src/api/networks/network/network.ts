import UndirectedGraph from "graphology"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import circular from "graphology-layout/circular"
import forceAtlas2 from "graphology-layout-forceatlas2"
import betweenessCentrality from "graphology-metrics/centrality/betweenness"
import { NetworkFilters, NetworkData, NetworkParameters } from "../../../types/network"
import communitiesCreate from "./communities"
import { configGetItemUrl } from "./config"
import { getParameters } from "./parameters"
import { ElasticAggregation, ElasticBucket } from "../../../types/commons"
import { ignoreIds, institutionsAcronyms, institutionsReplaceLabel } from "./ignore"

type NetworkBucket = ElasticBucket & { max_year: ElasticAggregation }

const nodeConcatMaxYear = (nodeMaxYear: number, maxYear: number) => (nodeMaxYear ? Math.max(nodeMaxYear, maxYear) : maxYear)
export const nodeGetId = (id: string) => {
  const nodeId = id.split("###")[0]
  return isNaN(+nodeId) ? nodeId : String(+nodeId)
}
const nodeGetLabel = (id: string, lang: string) => {
  const prefix = lang.toUpperCase() + "_"
  const labels = (id.split("###")[1] ?? id).split("|||")
  const label = labels.find((label) => label.startsWith(prefix)) ?? labels[0]
  return label.charAt(2) === "_" ? label.slice(3).trim() : label.trim()
}

export default async function networkCreate(
  query: string,
  model: string,
  filters: NetworkFilters,
  aggregation: Array<NetworkBucket>,
  parameters: NetworkParameters,
  lang: string
): Promise<NetworkData> {
  // Create Graph object
  let graph = new UndirectedGraph()
  graph.setAttribute("query", query)
  graph.setAttribute("model", model)
  graph.setAttribute("filters", filters)

  const { maxNodes, maxComponents, filterNode, clusters } = getParameters(parameters)

  aggregation.forEach((item) => {
    const { key, doc_count: count } = item
    const maxYear = item.max_year?.value
    const nodes = key.split("---")

    // Remove ignored ids
    if (ignoreIds?.[model]?.includes(nodeGetId(nodes[0])) || ignoreIds?.[model]?.includes(nodeGetId(nodes[1]))) return

    // Add nodes and compute weight
    nodes.forEach((id: string) =>
      graph.updateNode(nodeGetId(id), (attr) => ({
        label: nodeGetLabel(id, lang),
        weight: (attr?.weight ?? 0) + count,
        links: attr?.links ? [...attr.links, key] : [key],
        ...(maxYear && { maxYear: nodeConcatMaxYear(attr?.maxYear, maxYear) }),
      }))
    )

    // Add edges and compute weight
    graph.updateUndirectedEdgeWithKey(key, nodeGetId(nodes[0]), nodeGetId(nodes[1]), (attr) => ({
      weight: (attr?.weight ?? 0) + count,
      label: `${attr?.weight || 1} links`,
    }))
  })

  // Filter nodes
  if (filterNode) {
    graph = subgraph(graph, [...graph.neighbors(filterNode), filterNode])
  }

  // Keep only largests components
  const sortedComponents = connectedComponents(graph).sort((a, b) => b.length - a.length)
  let numberOfComponents = maxComponents || sortedComponents.length
  graph = subgraph(graph, sortedComponents.slice(0, numberOfComponents).flat())
  while (graph.order > maxNodes && numberOfComponents > 1) {
    numberOfComponents -= 1
    graph = subgraph(graph, sortedComponents.slice(0, numberOfComponents).flat())
  }
  // Keep only largests nodes
  if (graph.order > maxNodes) {
    betweenessCentrality.assign(graph)
    const sortedNodes = graph
      .mapNodes((node, attr) => ({ node: node, centrality: attr.betweennessCentrality }))
      .sort((a, b) => b.centrality - a.centrality)
      .map((node) => node.node)
    graph = subgraph(graph, sortedNodes.slice(0, maxNodes))
  }

  // Replace institutions labels
  if (["institutions", "structures"].includes(model)) {
    graph.updateEachNodeAttributes((node, attr) => ({
      ...attr,
      label: institutionsAcronyms?.[node] || institutionsReplaceLabel(attr.label),
    }))
  }

  // Add forceAtlas layout
  circular.assign(graph) // Needs a starting layout for forceAtlas to work
  const sensibleSettings = forceAtlas2.inferSettings(graph)
  forceAtlas2.assign(graph, { iterations: 100, settings: sensibleSettings })

  // Add communities
  const communities = await communitiesCreate(graph, clusters)

  // Create network
  const network: NetworkData = {
    items: graph.mapNodes((key, attr) => ({
      id: key,
      x: attr.x,
      y: attr.y,
      label: attr.label,
      cluster: attr.community + 1,
      weights: {
        Weight: attr.weight,
        Degree: graph.degree(key),
        ...(clusters && { Citations: attr?.citationsCount || 0 }),
      },
      scores: { ...(attr?.maxYear && { "Last publication": attr.maxYear }) },
      page: configGetItemUrl(model, key, attr.label),
      ...(attr?.publicationsCount !== undefined && { publicationsCount: attr?.publicationsCount }),
      ...(attr?.citationsCount !== undefined && { citationsCount: attr?.citationsCount }),
      ...(attr?.citationsRecent !== undefined && { citationsRecent: attr?.citationsRecent }),
      ...(attr?.citationsScore !== undefined && { citationsScore: attr?.citationsScore }),
    })),
    links: graph.mapEdges((_, attr, source, target) => ({
      source_id: source,
      target_id: target,
      strength: attr.weight,
    })),
    clusters: communities,
  }

  return network
}
