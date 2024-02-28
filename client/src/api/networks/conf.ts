const GRAPH_MODELS = {
  authors: { url: "authors", aggregations: [{ name: "domains", field: "co_domains.keyword" }] },
  institutions: { url: "organizations", aggregations: [{ name: "authors", field: "co_authors.keyword" }] },
  structures: { url: "organizations", aggregations: [{ name: "authors", field: "co_authors.keyword" }] },
  domains: { url: "search/publications", aggregations: [{ name: "publications", field: "title.default.keyword" }] },
}

export const graphGetConf = (model: string) => GRAPH_MODELS?.[model] ?? {}
export const graphGetAggs = (model: string) => GRAPH_MODELS?.[model]?.aggregations ?? []
