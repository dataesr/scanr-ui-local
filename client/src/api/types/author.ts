import { Aggregation } from "./commons";

export type Author = {
  _id: string;
  id: string;
  idref: string;
  orcid: string;
  fullName: string;
  externalIds: {
    id: string;
    type: string;
  }[];
  domains: {
    count: number
    type: string;
    code: string;
    label: {
      default: string;
      en: string;
      fr: string;
    };
  }[];
  awards: {
    label: string;
  }[];
  coAuthors: {
    value: string;
    label: string;
    count: number;
  }[];
}

export type AuthorsAggregations = {
  byAward: Aggregation[],
}