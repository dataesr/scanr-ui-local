import { Aggregation, LangField } from "./commons";
import { LightPublication } from "./publication";

export type LightAuthor = {
  id: string;
  idref: string;
  orcid: string;
  fullName: string;
  recent_affiliations: {
    label: string;
    id: string;
  }[];
  topDomains: {
    label: LangField;
    code: string;
    type: string;
    count: number;
  }[];
}

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
  awards: {
    label: string;
  }[];
  recent_affiliations: {
    label: string;
    id: string;
  }[];
  publications: {
    publicationsCount: number;
    publications: LightPublication[];
    coAuthors: Aggregation[];
    wikis: Aggregation[];
    reviews: Aggregation[];
    byYear: Aggregation[];
  }
}

export type AuthorsPublications = {
  publicationsCount: number;
  publications: LightPublication[];
  coAuthors: Aggregation[];
  wikis: Aggregation[];
  reviews: Aggregation[];
  byYear: Aggregation[];
}

export type AuthorsAggregations = {
  byAward: Aggregation[];
}