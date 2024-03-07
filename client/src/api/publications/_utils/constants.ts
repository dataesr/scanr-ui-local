export const FIELDS = [
  "externalIds.id^3",
  "title.*^3",
  "authors.fullName^3",
  "summary.*^2",
  "domains.label.*^2",
  "source.title",
  "source.publisher",
  "affiliations.id",
  "affiliations.label.*",
]
export const LIGHT_SOURCE = ["title.*", "authors.fullName", "authors.person", "authors.role", "source.*", "isOa", 'type', 'id', "year"]
