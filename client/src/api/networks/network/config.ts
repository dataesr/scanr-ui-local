import { NetworkConfig } from "../../../types/network"
import { COLORS } from "../_utils/constants"

export const CONFIG = {
  authors: {
    field: "authors.id_name",
    aggregation: "authors.id_name.keyword",
    co_aggregation: "co_authors.keyword",
    url: (key: string) => `/authors/${key}`,
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
    field: "affiliations.id_name",
    aggregation: "affiliations.id_name.keyword",
    co_aggregation: "co_institutions.keyword",
    url: (key: string) => `/organizations/${key}`,
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
    field: "affiliations.id_name",
    aggregation: "affiliations.id_name.keyword",
    co_aggregation: "co_structures.keyword",
    url: (key: string) => `/organizations/${key}`,
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
    field: "domains.id_name",
    aggregation: "domains.id_name.keyword",
    co_aggregation: "co_domains.keyword",
    url: (_: string, label: string) => `/search/publications?q="${label.replace(/ /g, "+")}"`,
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
    field: "software.id_name",
    aggregation: "software.id_name.keyword",
    co_aggregation: "co_software.keyword",
    url: (_: string, label: string) => `/search/publications?q="${label.replace(/ /g, "+")}"`,
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
  projects: {
    field: "projects.id_name",
    aggregation: "projects.id_name.keyword",
    co_aggregation: "co_projects.keyword",
    url: (key: string) => `/projects/${key}`,
    terminology: {
      item: "project",
      items: "projects",
      link: "co-projects link",
      links: "co-projects links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  countries: {
    field: "affiliations.country",
    aggregation: "affiliations.country.keyword",
    co_aggregation: "co_countries.keyword",
    url: (_: string, label: string) => `/search/publications?q="${label.replace(/ /g, "+")}"`,
    terminology: {
      item: "country",
      items: "countries",
      link: "co-countries link",
      links: "co-countries links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
}

const configGetItemDescription = () =>
  `<div class='description_heading'><a class='description_url' href={page}>{label}</a></div>`
const configGetLinkDescription = (model: string) =>
  `<div class='description_heading'>Co-${model} link</div><div class='description_label'>`

export function configGetItemUrl(model: string, key: string, label: string): string {
  const targetUrl = CONFIG?.[model]?.url(key, label) ?? ""
  const baseUrl = window?.location?.href?.split("/networks")[0] ?? ""
  return baseUrl + targetUrl
}

export default function configCreate(model: string): NetworkConfig {
  const templates = {
    item_description: configGetItemDescription(),
    link_description: configGetLinkDescription(model),
  }
  const terminology = CONFIG?.[model]?.terminology

  const cluster_colors = COLORS.map((color, index) => ({ cluster: index + 1, color: color }))

  const config = {
    templates: templates,
    color_schemes: { cluster_colors: cluster_colors },
    ...(terminology && { terminology: terminology }),
  }

  return config
}
