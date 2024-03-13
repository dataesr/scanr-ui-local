import { Aggregation, LangField } from "./commons";

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
  isGrandted: boolean;
  isOeb: boolean;
  affiliations: any;
  isInternational: boolean;
  type: string;
  _id: string;
  id: string;
  title: LangField;
  summary: LangField;
  fullName: string;
  submissionDate: number;
  publicationDate: number;
  grantedDate: number;
  authors: PatentActorsData[];

  domains: {
    level: string;
    code: string;
    type: string;
    label: {
      level: string;
      default: string;
    };
  }[];
  patents: [
    {
      id: string;
      isPriority: boolean;
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
  affiliations: { siren: string; idref: string }[];
  person: string;
  typeParticipant: string;
  rolePatent: RolePatent[];
  fullName: string;
  role?: string;
};

export type RolePatent = {
  role: "inv" | "dep";
  description: "inv" | "dep";
};

export type PatentAggregations = {
  byYear: Aggregation[];
};

export type ExportPatent = {
  patents: Patent[];
  domains: { label: LangField; code: string; type: string; count: number }[];
  title: { default: string; en: string; fr: string };
  summary: { default: string; en: string; fr: string };
  authors: { fullName: string; person: string; role?: string }[];
  isInternational: boolean;
  submissionDate: string;
  publicationDate: string;
  id: string;
};
