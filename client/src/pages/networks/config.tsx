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

const templates = (networkTab: string) => ({
  // prettier-ignore
  item_description: `<div class='description_label'><a class='description_url' href=http://localhost:4173/${(networkTab === "authors" ? networkTab : "organizations")}/{id} target='_self'>{label}</a></div><div class='description_text'>Ut enim ad minim veniam, quis nostrud exercitation</div>`,
  link_description: `<div class='description_heading'>Co-${networkTab} link</div><div class='description_label'><div class='description_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>`,
})

export default function getConfig(networkTab: string) {
  console.log("templates", templates(networkTab))
  const config = {
    // templates: templates(networkTab),
    ...(networkTab in TERMINOLOGY_MAPPING && { terminology: TERMINOLOGY_MAPPING[networkTab] }),
  }
  return config
}
