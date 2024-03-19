export const FIELDS = [
  "title.*^3",
  "summary.*^3",
  "domains.label.*",
  "domains.code^10",
  "id.keyword^10",
  "patents.id^10",
];
export const LIGHT_SOURCE = [
  "title",
  "id",
  "submissionDate",
  "publicationDate",
  "authors",
  "patents",
];
