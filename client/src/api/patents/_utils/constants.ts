export const FIELDS = ["title.*^3", "summary.*^3"];
export const LIGHT_SOURCE = [
  "label.*",
  "acronym.*",
  "address.main",
  "address.city",
  "kind",
  "level",
  "nature",
  "id",
  "creationYear",
  "isFrench",
  "active",
];
export const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  // { "id.keyword": { order: "desc" } },
];
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
  },
};

export const DEFAULT_FILTERS = [
  { term: { isFrench: true } },
  { term: { status: "active" } },
];
