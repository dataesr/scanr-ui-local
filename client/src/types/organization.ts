import { Aggregation, Address, LangField, ExternalIdsData } from "./commons";

export type OrganizationPublicationsData = {
  byYear: Aggregation[];
  byPublicationType: Aggregation[];
  byAuthors: Aggregation[];
  byWiki: Aggregation[];
  bySource: Aggregation[];
  publicationsCount: number;
};
export type OrganizationProjectsData = {
  byYear: Aggregation[];
  byType: Aggregation[];
  byKeywords: Aggregation[];
  projectsCount: number;
};

export type OrganizationPatentsData = {
  nature: any;
  level: any;
  kind: any;
  byYear: Aggregation[];
  patentsCount: number;
};

type BaseLink = {
  type?: string;
  url?: string;
  language?: string;
};
type BaseSocialMedia = BaseLink & { account?: string };
export type OrganizationLinksData = BaseLink[];
export type OrganizationSocialMediasData = BaseSocialMedia[];

export type RelatedOrganizationData = {
  structure: string;
  relationType?: string;
  type?: string;
  fromDate: string;
  label: string;
  denormalized: {
    id: string;
    label: LangField;
    address?: Address[];
  };
};

export type OrganizationLeaderData = {
  person?: string;
  role?: string;
  fromDate?: string;
  firstName?: string;
  lastName?: string;
};

export type OrganizationBadgesData = {
  code: string;
  label: LangField;
};
export type OrganizationAwardsData = {
  label: string,
  year: number,
  domain?: {
    id: string,
    label: string
  }
}
export type OrganizationAgreementsData = {
  type: string,
  start: number,
  end: number,
  years: number[],
  label: string,
}

export type Organization = {
  _id: string;
  id: string;
  isFrench: boolean;
  label: LangField;
  creationYear?: number;
  acronym: LangField;
  description: LangField;
  externalIds: ExternalIdsData[];
  kind: string[];
  nature?: string;
  level?: string;
  address?: Address[];
  badges?: OrganizationBadgesData[];
  leaders?: OrganizationLeaderData[];
  institutions?: RelatedOrganizationData[];
  institutionOf?: RelatedOrganizationData[];
  parents?: RelatedOrganizationData[];
  parentOf?: RelatedOrganizationData[];
  relations?: RelatedOrganizationData[];
  relationOf?: RelatedOrganizationData[];
  socialMedias: OrganizationSocialMediasData;
  links: OrganizationLinksData;
  publications: OrganizationPublicationsData;
  projects: OrganizationProjectsData;
  patents: OrganizationPatentsData;
  awards: OrganizationAwardsData[];
  agreements: OrganizationAgreementsData[];
};

export type OrganizationAggregations = {
  byNature: Aggregation[];
  byKind: Aggregation[];
  byLocalization: Aggregation[];
  byLevel: Aggregation[];
  byFundings: Aggregation[];
  byTags: Aggregation[];
  byAwards: Aggregation[];
  byAgreements: Aggregation[];
};

export type LightOrganization = {
  label: LangField;
  acronym: LangField;
  address: {
    main: boolean;
    city?: string;
  }[];
  kind: string[];
  level: string;
  nature: string;
  id: string;
  creationYear: string;
  isFrench: string;
  active: string;
  publicationsCount: number;
  projectsCount: number;
};


export type ExportOrganization = {
  label: LangField;
  acronym: LangField;
  address: {
    postcode: string;
    main: boolean;
    city?: string;
  }[];
  links: OrganizationLinksData;
  kind: string[];
  nature: string;
  id: string;
};
