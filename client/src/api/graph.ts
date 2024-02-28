import UndirectedGraph from "graphology"
import louvain from "graphology-communities-louvain"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import { Network } from "../types/network"

const GRAPH_MAX_ORDER = 300
const GRAPH_MAX_COMPONENTS = 5
export const GRAPH_MAPPING = {
  authors: { url: "authors", subAgg: "domains", subAggField: "co_domains.keyword" },
  institutions: { url: "organizations", subAgg: "authors", subAggField: "co_authors.keyword" },
  structures: { url: "organizations", subAgg: "authors", subAggField: "co_authors.keyword" },
  domains: { url: "search/publications", subAgg: "publications", subAggField: "title.default.keyword" },
}

const bucketToObject = (bucket) =>
  bucket.reduce((acc, item) => {
    item.key.split("---").forEach((coitem) => {
      const label = coitem.split("###")[1] ?? coitem
      acc[label] = acc[label] ? acc[label] + item.doc_count : item.doc_count
    })
    return acc
  }, {})

const objectMerge = (obj1: object, obj2: object): object =>
  Object.entries(obj2).reduce((acc, [key, value]) => ({ ...acc, [key]: (acc[key] || 0) + value }), { ...obj1 })

const objectSlice = (obj: object, n: number): object =>
  Object.entries(obj)
    .sort(({ 1: a }, { 1: b }) => b - a)
    .slice(0, n)
    .reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})

const objectToString = (obj: object): string =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    return `${acc}${k} (${v})</br>`
  }, "")

function itemGetDescription(key: string, attr: any, agg: string): string {
  const url =
    agg === "domains" ? `${GRAPH_MAPPING[agg].url}?q="${attr.label.replace(" ", "+")}"` : `${GRAPH_MAPPING[agg].url}/${key}`
  const header = `<div class='description_label'><a class='description_url' href=${url} target='_self'>{label}</a></div><div></div>`
  const description = attr?.subAgg
    ? `<div class='description_text'><span><b>Main ${GRAPH_MAPPING[agg].subAgg}:</b></br>${objectToString(
        objectSlice(attr.subAgg, 5)
      )}</div>`
    : ""

  return header + description
}

export function aggToGraphology(aggregation: Array<any>, agg: string): Network {
  // Create Graph object
  let graph = new UndirectedGraph()

  aggregation.forEach((item) => {
    const { key, doc_count: count } = item
    const maxYear = item.max_year?.value
    const bucketSubAgg = item?.agg_sub && (item.agg_sub.buckets.length ? item.agg_sub.buckets : undefined)
    const nodes = key.split("---")

    // Add nodes and compute weight
    nodes.forEach((id) =>
      graph.updateNode(id.split("###")[0], (attr) => ({
        label: id.split("###")[1],
        weight: (attr?.weight ?? 0) + count,
        ...(maxYear && { maxYear: attr?.maxYear ? Math.max(attr.maxYear, maxYear) : maxYear }),
        ...(bucketSubAgg && {
          subAgg: attr?.subAgg ? objectMerge(attr.subAgg, bucketToObject(bucketSubAgg)) : bucketToObject(bucketSubAgg),
        }),
      }))
    )

    // Add edges and compute weight
    graph.updateUndirectedEdgeWithKey(key, nodes[0].split("###")[0], nodes[1].split("###")[0], (attr) => ({
      weight: (attr?.weight ?? 0) + count,
      label: `${attr?.weight || 1} links`,
      ...(bucketSubAgg && { subAgg: bucketToObject(bucketSubAgg) }),
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
          description: itemGetDescription(key, attr, agg),
        },
      ],
      []
    ),
    links: graph.reduceEdges(
      (acc, _, attr, source, target) => [
        ...acc,
        {
          source_id: source,
          target_id: target,
          strength: attr?.weight,
        },
      ],
      []
    ),
  }

  console.log("network", network)

  return network
}
