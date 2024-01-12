import { Aggregation, Address, LangField } from "./commons"

export type OrganizationPublicationsData = {
  byIsOa: Aggregation[],
  byYear: Aggregation[],
  byPublicationType: Aggregation[],
  byAuthors: Aggregation[],
  byWiki: Aggregation[],
  bySource: Aggregation[],
  publicationsCount: number,
}
export type OrganizationProjectsData = {
  byYear: Aggregation[],
  byType: Aggregation[],
  byKeywords: Aggregation[],
  projectsCount: number,
}

export type OrganizationPatentsData = {
  byYear: Aggregation[],
  patentsCount: number,
}

type BaseLink = {
  type?: string,
  url?: string,
  language?: string
}
type BaseSocialMedia = BaseLink & { account?: string,}
export type OrganizationLinksData = BaseLink[]
export type OrganizationSocialMediasData = BaseSocialMedia[]

export type RelatedOrganizationData = {
  structure: string,
  relationType?: string,
  type?: string,
  fromDate: string,
  label: string,
  denormalized: {
    id: string,
    label: LangField,
    address?: Address[],
  }
}

export type OrganizationLeaderData = {
  person?: string,
  role?: string,
  fromDate?: string,
  firstName?: string,
  lastName?: string,
}

export type ExternalIdsData = {
  id: string,
  type: string,
}

export type OrganizationBadgesData = {
  code: string,
  label: LangField,
}

export type Organization = {
  _id: string,
  id: string,
  label: LangField,
  creationYear?: number,
  acronym: LangField,
  description: LangField,
  externalIds: ExternalIdsData[],
  kind: string[],
  nature?: string,
  level?: string,
  address?: Address[],
  badges?: OrganizationBadgesData[],
  leaders?: OrganizationLeaderData[],
  institutions?: RelatedOrganizationData[],
  relations?: RelatedOrganizationData[],
  socialMedias: OrganizationSocialMediasData,
  links: OrganizationLinksData,
  publications: OrganizationPublicationsData,
  projects: OrganizationProjectsData,
  patents: OrganizationPatentsData,
}


export type OrganizationAggregations = {
  byNature: Aggregation[],
  byKind: Aggregation[],
  byLocalization: Aggregation[],
  byLevel: Aggregation[],
}
