import { Aggregation, ExternalIdsData, LangField } from "./commons"

type OaEvidenceData = {
  hostType: string,
  hostUrl: string,
  version: string,
  url: string,
}

type DomainsData = {
  type: string,
  label: LangField,
  code: string,
}

type SourceData = {
  title: string,
  volume?: string,
  issue?: string,
  publisher?: string,
}

type ProjectData = {
  id: string,
  label: LangField,
  acronym: LangField,
  year: number,
  type: string,

}

type BasePublication = {
  id: string,
  title: LangField,
  source: SourceData,
  isOa: boolean,
  type: string,
  year: number,
}

export type LightPublication = BasePublication & {
  authors: {
    fullName: string,
    person: string,
    role?: string,
  }[],
}

export type Publication = BasePublication & {
  _id: string,
  summary: LangField,
  doiUrl?: string,
  domains: DomainsData[],
  affiliations: {
    name: string,
    id: string,
  }[],
  authors: {
    fullName,
    person,
    role,
    affiliations: Record<string, unknown>[],
  }[],
  oaEvidence?: OaEvidenceData,
  projects: ProjectData[],
  externalIds: ExternalIdsData[]
}

export type PublicationAggregations = {
  byYear: Aggregation[],
  byType: Aggregation[],
  byAuthors: Aggregation[],
  byIsOa: Aggregation[],
  byFunder: Aggregation[],
}