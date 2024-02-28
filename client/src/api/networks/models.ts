const GRAPH_MODELS = {
  authors: {
    url: "http://localhost:5173/authors",
    aggregations: [{ name: "domains", field: "co_domains.keyword" }],
    terminology: {
      item: "author",
      items: "authors",
      link: "co-author",
      links: "co-authors",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
  institutions: {
    url: "http://localhost:5173/organizations",
    aggregations: [{ name: "authors", field: "co_authors.keyword" }],
    terminology: {
      item: "institution",
      items: "institutions",
      link: "co-institution",
      links: "co-institutions",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
  structures: {
    url: "http://localhost:5173/organizations",
    aggregations: [{ name: "authors", field: "co_authors.keyword" }],
    terminology: {
      item: "structure",
      items: "structures",
      link: "co-structure",
      links: "co-structures",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
  domains: {
    url: "http://localhost:5173/search/publications",
    aggregations: [{ name: "publications", field: "title.default.keyword" }],
    terminology: {
      item: "domain",
      items: "domains",
      link: "co-domain",
      links: "co-domains",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
}

export const graphGetConf = (model: string) => GRAPH_MODELS?.[model] ?? {}
export const graphGetAggs = (model: string) => GRAPH_MODELS?.[model]?.aggregations ?? []
export const graphGetTerminology = (model: string) => GRAPH_MODELS?.[model]?.terminology ?? {}
