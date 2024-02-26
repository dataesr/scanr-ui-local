import { Aggregation, LangField } from "./commons";
import { LightPublication } from "./publication";

// export type LightPatent = {
//   id: string;
//   creationYear: string;
//   kind: array;
//   isFrench: boolean;
//   recent_affiliations: {
//     label: string;
//     id: string;
//   }[];
//   topDomains: {
//     label: LangField;
//     code: string;
//     type: string;
//     count: number;
//   }[];
//   domains: {
//     label: LangField;
//     code: string;
//     type: string;
//     count: number;
//   }[];
// };

export type Patent = {
  _id: string;
  id: string;
  title: LangField;
  summary: LangField;
  fullName: string;
  submissionDate: number;
  publicationDate: number;
  grantedDate: number;
  authors: [
    {
      typeParticipant: string;
      fullName: string;
      country: string;
      rolePatent: [{ role: string }];
      affiliations: [];
    }
  ];
  domains: [
    {
      level: string;
      code: string;
      type: string;
      label: {
        level: string;
        default: string;
      };
    }
  ];
  patents: [
    {
      id: string;
      isPriority: false;
      ipType: string;
      office: string;
      applicationDate: string;
      applicationNumber: string;
      internatApplicationNumber: string;
      publicationDate: number;
      publicationNumber: string;
      links: [
        {
          type: string;
          url: string;
          label: string;
        }
      ];
    }
  ];
};

export type PatentActorsData = {
  rolePatent: any;
  fullName: string;
  person?: string;
  role?: string;
  actors?: string;
  fromDate?: string;
  firstName?: string;
  lastName?: string;
};

// export type PatentPublications = {
//   publicationsCount: number;
//   publications: LightPublication[];
//   coAuthors: Aggregation[];
//   wikis: Aggregation[];
//   reviews: Aggregation[];
//   byYear: Aggregation[];
// };

// export type PatentAggregations = {
//   byAward: Aggregation[];
// };
