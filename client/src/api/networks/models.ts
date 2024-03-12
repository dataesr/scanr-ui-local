const GRAPH_MODELS = {
  authors: {
    url: "/authors",
    aggregations: [{ name: "domains", field: "co_domains.keyword" }],
    terminology: {
      item: "author",
      items: "authors",
      link: "co-author link",
      links: "co-author links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
  institutions: {
    url: "/organizations",
    aggregations: [
      { name: "authors", field: "co_authors.keyword" },
      { name: "domains", field: "co_domains.keyword" },
    ],
    terminology: {
      item: "institution",
      items: "institutions",
      link: "co-institution link",
      links: "co-institution links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
  structures: {
    url: "/organizations",
    aggregations: [
      { name: "authors", field: "co_authors.keyword" },
      { name: "domains", field: "co_domains.keyword" },
    ],
    terminology: {
      item: "structure",
      items: "structures",
      link: "co-structure link",
      links: "co-structure links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
  domains: {
    url: "/search/publications",
    aggregations: [{ name: "publications", field: "title.default.keyword" }],
    terminology: {
      item: "domain",
      items: "domains",
      link: "co-domain link",
      links: "co-domain links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "publications",
    },
  },
  software: {
    url: "/search/publications",
    aggregations: [{ name: "domains", field: "co_domains.keyword" }],
    terminology: {
      item: "software",
      items: "software",
      link: "co-software link",
      links: "co-software links",
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
