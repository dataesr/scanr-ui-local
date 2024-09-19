import { Aggregation, LangField } from "./commons";
import { LightPublication } from "./publication";

export type LightAuthor = {
  id: string;
  idref: string;
  orcid?: string;
  id_hal?: string;
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
  domains: {
    label: LangField;
    code: string;
    type: string;
    count: number;
  }[];
}

export type ExportAuthor = {
  id: string;
  idref: string;
  orcid: string;
  fullName: string;
  firstName: string;
  lastName: string;
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
  firstName?: string;
  lastName?: string;
  wikis: Aggregation[];
  externalIds: {
    id: string;
    type: string;
    url?: string;
  }[];
  awards: {
    label: string;
  }[];
  recentAffiliations: RecentAffiliation[];
  publications: AuthorsPublications
}

export type AuthorsPublications = {
  publicationsCount: number;
  publications: LightPublication[];
  coAuthors: Aggregation[];
  reviews: Aggregation[];
  byYear: Aggregation[];
}

export type AuthorsAggregations = {
  byAward: Aggregation[];
}

export type RecentAffiliation = {
  structure: {
    id: string;
    mainAddress: {
      address: string;
      gps: {
        lat: number;
        lon: number;
      };
      postcode: string;
      city: string;
      country: string;
    };
    kind: string[];
    label: LangField;
    acronym: LangField;
    status: string;
    isFrench: boolean;
    endDate: string;
    startDate: string;
  };
  sources: {
    id: string;
    year: string;
  }[];
};
