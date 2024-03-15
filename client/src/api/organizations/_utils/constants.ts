export const FIELDS = [
  "id^3",
  "externalIds.id^3",
  "label.*^3",
  "acronym.*^3",
  "publications.title.default^2",
  "publications.summary.default",
  "projects.label.*^2",
  "projects.acronym.*",
  "description.*^2",
  "alias^3",
  "web_content"
]
export const LIGHT_SOURCE = ["label.*", "acronym.*", "address.main", "address.city", "kind", "level", 'nature', 'id', "creationYear", "isFrench", "active"]
export const EXPORT_SOURCE = ["label.*", "acronym.*", "address.*", "links", "kind", "nature", "id"]

export const DEFAULT_FILTERS = [
  { term: { isFrench: true } },
  { term: { status: "active" } },
]