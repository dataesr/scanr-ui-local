const GRAPH_MODELS = {
  authors: {
    url: "/authors",
    terminology: {
      item: "author",
      items: "authors",
      link: "co-author link",
      links: "co-author links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  institutions: {
    url: "/organizations",
    terminology: {
      item: "institution",
      items: "institutions",
      link: "co-institution link",
      links: "co-institution links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  structures: {
    url: "/organizations",
    terminology: {
      item: "structure",
      items: "structures",
      link: "co-structure link",
      links: "co-structure links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  domains: {
    url: "/search/publications",
    terminology: {
      item: "domain",
      items: "domains",
      link: "co-domain link",
      links: "co-domain links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  software: {
    url: "/search/publications",
    terminology: {
      item: "software",
      items: "software",
      link: "co-software link",
      links: "co-software links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
}

export const graphGetConf = (model: string) => GRAPH_MODELS?.[model] ?? {}
export const graphGetTerminology = (model: string) => GRAPH_MODELS?.[model]?.terminology ?? {}
