export const FIELDS = [
  "id^10",
  "externalIds.id^3",
  "fullName^3",
  "publications.title.default^2",
  "publications.summary.default^2",
  "publications.publication^2",
  "domains.label.*^2",
  "domains.code^2",
  "recentAffiliations.structure.label.*",
  "recentAffiliations.structure.acronym.*",
  "recentAffiliations.structure.id",
  "awards.label.*",
]

export const LIGHT_SOURCE = [
  "id", "fullName", "domains", "orcid", "id_hal",
  "idref", "recent_affiliations", "topDomains",
]