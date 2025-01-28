import { patentsIndex, publicationsIndex } from "../../../config/api"
import { NetworkConfig } from "../../../types/network"
import { FIELDS as publicationsFields } from "../../publications/_utils/constants"
import { FIELDS as patentsFields, LIGHT_SOURCE as patentsSourceFields } from "../../patents/_utils/constants"
import { COLORS } from "../_utils/constants"

const publicationsSourceFields = [
  "id",
  "title.default",
  "year",
  "productionType",
  "isOa",
  "domains",
  "cited_by_counts_by_year",
]

export const CONFIG = {
  authors: {
    index: publicationsIndex,
    field: "authors.id_name",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "authors.id_name"],
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
    index: publicationsIndex,
    field: "affiliations.id_name",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "affiliations.id_name"],
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
    index: publicationsIndex,
    field: "affiliations.id_name",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "affiliations.id_name"],
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
    index: publicationsIndex,
    field: "domains.id_name",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "domains.id_name"],
    aggregation: "domains.id_name.keyword",
    co_aggregation: "co_domains.keyword",
    url: (_: string, label: string) => `/search/publications?q="${label.replace(/ /g, "+")}"`,
    terminology: {
      item: "topic",
      items: "topics",
      link: "co-topic link",
      links: "co-topic links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  software: {
    index: publicationsIndex,
    field: "software.id_name",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "software.id_name"],
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
    index: publicationsIndex,
    field: "projects.id_name",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "projects.id_name"],
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
    index: publicationsIndex,
    field: "affiliations.country",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "affiliations.country"],
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
  persons: {
    index: patentsIndex,
    field: "applicants.id_name",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "applicants.id_name"],
    aggregation: "applicants.id_name.keyword",
    co_aggregation: "co_persons.keyword",
    url: (_: string, label: string) => `/search/patents?q="${label.replace(/ /g, "+")}"`,
    terminology: {
      item: "person",
      items: "persons",
      link: "co-persons link",
      links: "co-persons links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
  organizations: {
    index: patentsIndex,
    field: "applicants.id_name",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "applicants.id_name"],
    aggregation: "applicants.id_name.keyword",
    co_aggregation: "co_organizations.keyword",
    url: (_: string, label: string) => `/search/patents?q="${label.replace(/ /g, "+")}"`,
    terminology: {
      item: "organization",
      items: "organizations",
      link: "co-organizations link",
      links: "co-organizations links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
  subclasses: {
    index: patentsIndex,
    field: "cpc.ss_classe.id_name",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "cpc.ss_classe.id_name"],
    aggregation: "cpc.ss_classe.id_name.keyword",
    co_aggregation: "co_cpc_ss_classe.keyword",
    url: (_: string, label: string) => `/search/patents?q="${label.replace(/ /g, "+")}"`,
    terminology: {
      item: "subclass",
      items: "subclasses",
      link: "co-subclasses link",
      links: "co-subclasses links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
  classes: {
    index: patentsIndex,
    field: "cpc.classe.id_name",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "cpc.classe.id_name"],
    aggregation: "cpc.classe.id_name.keyword",
    co_aggregation: "co_cpc_classe.keyword",
    url: (_: string, label: string) => `/search/patents?q="${label.replace(/ /g, "+")}"`,
    terminology: {
      item: "classe",
      items: "classes",
      link: "co-classes link",
      links: "co-classes links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
}

const configGetItemDescription = () =>
  `<div class='description_heading'><a class='description_url' href={page}>{label}</a></div>`
const configGetLinkDescription = (model: string) =>
  `<div class='description_heading'>Co-${model} link</div><div class='description_label'>`

export function configGetItemUrl(model: string, key: string, label: string): string {
  const targetUrl = CONFIG?.[model]?.url(key, label) ?? ""
  return window.location.origin + targetUrl
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
