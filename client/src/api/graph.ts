import UndirectedGraph from "graphology"
import louvain from "graphology-communities-louvain"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import { Network } from "../types/network"

const GRAPH_MAX_ORDER = 300
const GRAPH_MAX_COMPONENTS = 3

const bucketToDomains = (bucket) =>
  bucket.reduce((acc, item) => {
    item.key.split("---").forEach((codomain) => {
      const label = codomain.split("###")[1]
      acc[label] = acc[label] ? acc[label] + item.doc_count : item.doc_count
    })
    return acc
  }, {})

const objectMerge = (obj1: object, obj2: object): object =>
  Object.entries(obj2).reduce((acc, [key, value]) => ({ ...acc, [key]: (acc[key] || 0) + value }), { ...obj1 })

export function aggToGraphology(aggregation: Array<any>): Network {
  // Create Graph object
  let graph = new UndirectedGraph()

  aggregation.forEach((item) => {
    const { key, doc_count: count } = item
    const maxYear = item.max_year?.value
    const bucketDomains = item?.agg_domains && (item.agg_domains.buckets.length ? item.agg_domains.buckets : undefined)
    const nodes = key.split("---")

    // Add nodes and compute weight
    nodes.forEach((id) =>
      graph.updateNode(id.split("###")[0], (attr) => ({
        label: id.split("###")[1],
        weight: (attr?.weight ?? 0) + count,
        ...(maxYear && { maxYear: attr?.maxYear ? Math.max(attr.maxYear, maxYear) : maxYear }),
        ...(bucketDomains && {
          domains: attr?.domains
            ? objectMerge(attr.domains, bucketToDomains(bucketDomains))
            : bucketToDomains(bucketDomains),
        }),
      }))
    )

    // Add edges and compute weight
    graph.updateUndirectedEdgeWithKey(key, nodes[0].split("###")[0], nodes[1].split("###")[0], (attr) => ({
      weight: (attr?.weight ?? 0) + count,
      label: `${attr?.weight || 1} links`,
    }))
  })

  // Keep only largests components
  const sortedComponents = connectedComponents(graph).sort((a, b) => b.length - a.length)
  graph = subgraph(graph, sortedComponents.slice(0, GRAPH_MAX_COMPONENTS).flat())

  // Filter with minimal number of nodes
  let nodeWeightThresh = 1
  while (graph.order > GRAPH_MAX_ORDER) {
    nodeWeightThresh += 1
    graph = subgraph(graph, (_, attr) => attr?.weight >= nodeWeightThresh) // eslint-disable-line no-loop-func
  }

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

  // Create network
  const network = {
    items: graph.reduceNodes(
      (acc, key, attr) => [
        ...acc,
        {
          id: key,
          label: attr?.label,
          cluster: (attr?.community ?? 0) + 1,
          weights: { Weight: attr?.weight, Degree: graph.degree(key) },
          scores: { "Last activity": attr?.maxYear },
        },
      ],
      []
    ),
    links: graph.reduceEdges(
      (acc, _, attr, source, target) => [...acc, { source_id: source, target_id: target, strength: attr?.weight }],
      []
    ),
  }

  // console.log("network", network)

  return network
}
