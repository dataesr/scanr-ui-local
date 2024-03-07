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
export const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { "id.keyword": { order: "desc" } }
]
export const HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "label.default": {},
    "acronym.default": {},
    "publications.title.default": {},
    "publications.summary.default": {},
    "projects.label.default": {},
    "projects.description.default": {},
    web_content: {},
  }
}

export const DEFAULT_FILTERS = [
  { term: { isFrench: true } },
  { term: { status: "active" } },
]
