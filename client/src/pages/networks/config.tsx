const terminologyAuthors = {
  item: "author",
  items: "authors",
  link: "co-author",
  links: "co-authors",
  cluster: "community",
  clusters: "communities",
  total_link_strength: "publications",
}
const terminologyInstitutions = {
  item: "institution",
  items: "institutions",
  link: "co-institution",
  links: "co-institutions",
  cluster: "community",
  clusters: "communities",
  total_link_strength: "publications",
}
const terminologyStructures = {
  item: "structure",
  items: "structures",
  link: "co-structure",
  links: "co-structures",
  cluster: "community",
  clusters: "communities",
  total_link_strength: "publications",
}
const terminologyDomains = {
  item: "domain",
  items: "domains",
  link: "co-domain",
  links: "co-domains",
  cluster: "community",
  clusters: "communities",
  total_link_strength: "publications",
}

const TERMINOLOGY_MAPPING = {
  authors: terminologyAuthors,
  institutions: terminologyInstitutions,
  structures: terminologyStructures,
  domains: terminologyDomains,
}

export default function getConfig(networkTab: string) {
  const config = {
    templates: {},
    ...(networkTab in TERMINOLOGY_MAPPING && { terminology: TERMINOLOGY_MAPPING[networkTab] }),
  }
  return config
}
