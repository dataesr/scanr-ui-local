export const FIELDS = [
  "id^5",
  "acronym.*^5",
  "externalIds.id^3",
  "alias^3",
  "label.*^3",
  "description.*^2",
  "address.city",
  "address.address",
  "address.postcode",

  "publications.id^2",
  "publications.title.default^2",
  "publications.summary.default",
  "publications.domains.label.*^2",
  "publications.domains.code^2",

  "projects.label.*^2",
  "projects.acronym.*",
  "projects.id^2",
  
  "badges.label.*",
  "badges.code",

  "patents.id^2",
  "patents.title.*^2",

  "agreements.type^2",

  "awards.label^2",
  "awards.summary",
  
  "web_content"
]
export const LIGHT_SOURCE = ["label.*", "acronym.*", "address.main", "address.city", "kind", "level", 'nature', 'id', "creationYear", "isFrench", "active"]
export const EXPORT_SOURCE = ["label.*", "acronym.*", "address.*", "links", "kind", "nature", "id"]

export const DEFAULT_FILTERS = [
  { term: { isFrench: true } },
  { term: { status: "active" } },
]