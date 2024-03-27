import { Attributes } from "graphology-types"
import { NetworkConfig } from "../../../types/network"

const CONFIG = {
  authors: {
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
    url: (_: string, attr: Attributes) => `/search/publications?q="${attr.label.replace(/ /g, "+")}"`,
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
    url: (_: string, attr: Attributes) => `/search/publications?q="${attr.label.replace(/ /g, "+")}"`,
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

const configGetItemDescription = () =>
  `<div class='description_heading'><a class='description_url' href={page}>{label}</a></div>`
const configGetLinkDescription = (model: string) =>
  `<div class='description_heading'>Co-${model} link</div><div class='description_label'>`

export function configGetItemUrl(model: string, key: string, attr: Attributes): string {
  const targetUrl = CONFIG?.[model]?.url(key, attr) ?? ""
  const baseUrl = window?.location?.href?.split("/networks")[0] ?? ""
  return baseUrl + targetUrl
}

export default function configCreate(model: string): NetworkConfig {
  const templates = {
    item_description: configGetItemDescription(),
    link_description: configGetLinkDescription(model),
  }
  const terminology = CONFIG?.[model]?.terminology

  const config = {
    templates: templates,
    ...(terminology && { terminology: terminology }),
  }

  console.log("config", config)
  return config
}
