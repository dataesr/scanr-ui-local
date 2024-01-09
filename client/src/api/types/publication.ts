import { Aggregation } from "./commons"

export type Publication = {
  _id: string,
  id: string,
  title: {
    default: string,
    en?: string,
    fr?: string,
  },
  summary: {
    default: string,
    en?: string,
    fr?: string,
  },
  authors: {
    fullName: string,
    person: string,
  }[],
  source: {
    title: string,
    volume?: string,
    issue?: string,
    publisher?: string,
  },
  isOa: boolean,
  type: string,
  productionType: string,
  year: number,
}

export type PublicationAggregations = {
  byYear: Aggregation[],
  byType: Aggregation[],
  byAuthors: Aggregation[],
  byIsOa: Aggregation[],
  byFunder: Aggregation[],
}