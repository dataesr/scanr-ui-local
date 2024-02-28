const GRAPH_MODELS = {
  authors: { url: "http://localhost:5173/authors", aggregations: [{ name: "domains", field: "co_domains.keyword" }] },
  institutions: {
    url: "http://localhost:5173/organizations",
    aggregations: [{ name: "authors", field: "co_authors.keyword" }],
  },
  structures: {
    url: "http://localhost:5173/organizations",
    aggregations: [{ name: "authors", field: "co_authors.keyword" }],
  },
  domains: {
    url: "http://localhost:5173/search/publications",
    aggregations: [{ name: "publications", field: "title.default.keyword" }],
  },
}

export const graphGetConf = (model: string) => GRAPH_MODELS?.[model] ?? {}
export const graphGetAggs = (model: string) => GRAPH_MODELS?.[model]?.aggregations ?? []
