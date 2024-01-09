import { Aggregation } from "./commons"

export type Organization = {
  _id: string,
  id: string,
  label: {
    default: string,
    en?: string,
    fr?: string,
  },
  creationYear?: number,
  acronym: {
    default: string,
    en?: string,
    fr?: string,
  },
  description: {
    default: string,
    en?: string,
    fr?: string,
  },
  externalIds: {
    id: string,
    type: string,
  }[],
  kind: string[],
  nature?: string,
  level?: string,
  address?: {
    main: boolean,
    city?: string,
    address?: string,
    postcode?: string,
    country?: string,
    gps?: {
      lat: number,
      lon: number,
    },
  }[],
  leaders?: {
      person: string,
      role: string,
      fromDate: string,
      firstName: string,
      lastName: string,
  }[],
  institutions?: {
    structure: string,
    relationType: string,
    fromDate: string,
    label: string,
    denormalized: {
      id: string,
      label: {
        default: string,
        en?: string,
        fr?: string,
      },
      address?: {
        main: boolean,
        city?: string,
        address?: string,
        postcode?: string,
        country?: string,
        gps?: {
          lat: number,
          lon: number,
        },
      }[],
    }
  }[],
  relations?: {
    structure: string,
    type: string,
    fromDate: string,
    label: string,
    denormalized: {
      id: string,
      label: {
        default: string,
        en?: string,
        fr?: string,
      },
      address?: {
        main: boolean,
        city?: string,
        address?: string,
        postcode?: string,
        country?: string,
        gps?: {
          lat: number,
          lon: number,
        },
      },
    }
  }[],
  socialMedias: {
    account?: string,
    type?: string,
    url?: string,
    language?: string
  }[],
  links: {
    type?: string,
    url?: string,
    language?: string
  }[],
  publications: {
    byIsOa: Aggregation[],
    byYear: Aggregation[],
    byPublicationType: Aggregation[],
    byAuthors: Aggregation[],
    byWiki: Aggregation[],
    bySource: Aggregation[],
    publicationsCount: number,
  }
  projects: {
    byYear: Aggregation[],
    byType: Aggregation[],
    byKeywords: Aggregation[],
    projectsCount: number,
  }
}


export type OrganizationAggregations = {
  byNature: Aggregation[],
  byKind: Aggregation[],
  byLocalization: Aggregation[],
  byLevel: Aggregation[],
}
