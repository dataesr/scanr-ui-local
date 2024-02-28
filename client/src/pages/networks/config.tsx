const terminologyAuthors = {
  item: "author",
  items: "authors",
  link: "co-author",
  links: "co-authors",
  cluster: "community",
  clusters: "communities",
  link_strength: "co-publications",
  total_link_strength: "publications",
}
const terminologyInstitutions = {
  item: "institution",
  items: "institutions",
  link: "co-institution",
  links: "co-institutions",
  cluster: "community",
  clusters: "communities",
  link_strength: "co-publications",
  total_link_strength: "publications",
}
const terminologyStructures = {
  item: "structure",
  items: "structures",
  link: "co-structure",
  links: "co-structures",
  cluster: "community",
  clusters: "communities",
  link_strength: "co-publications",
  total_link_strength: "publications",
}
const terminologyDomains = {
  item: "domain",
  items: "domains",
  link: "co-domain",
  links: "co-domains",
  cluster: "community",
  clusters: "communities",
  link_strength: "co-publications",
  total_link_strength: "publications",
}

const TERMINOLOGY_MAPPING = {
  authors: terminologyAuthors,
  institutions: terminologyInstitutions,
  structures: terminologyStructures,
  domains: terminologyDomains,
}

const templates = (tab: string) => ({
  // prettier-ignore
  link_description: `<div class='description_heading'>Co-${tab} link</div><div class='description_label'><div class='description_text'>{strength} co-publications</div>`,
})

export default function getConfig(networkTab: string) {
  const config = {
    templates: templates(networkTab),
    ...(networkTab in TERMINOLOGY_MAPPING && {
      terminology: TERMINOLOGY_MAPPING[networkTab],
    }),
  }
  return config
}
