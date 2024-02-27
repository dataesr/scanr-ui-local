import { LightAuthor } from "./author";
import { LightOrganization } from "./organization";
import { Patent } from "./patent";
import { LightProject } from "./project";
import { LightPublication } from "./publication";

export type SearchArgs = {
  cursor?: string | unknown;
  query?: string;
  filters?: Record<string, unknown>[];
};

export type AggregationArgs = {
  query?: string;
  filters?: Record<string, unknown>[];
};

export type ElasticResult<T> = {
  _id: string;
  _index: string;
  _score: number;
  _source: T;
  _type: string;
  highlight: Record<string, string[]>;
  sort: number[];
};

export type SearchResponse<T> = {
  data: ElasticResult<T>[];
  cursor: string;
  total: number;
};

export type InfiniteResponse<T> = SearchResponse<T>;
export type InfiniteResult<T> = {
  total: number;
  results: ElasticResult<T>[];
};

export type Aggregation = {
  value: string;
  label: string;
  count: number;
  href?: string;
  normalizedCount?: number;
};

export type Address = {
  main: boolean;
  city?: string;
  address?: string;
  postcode?: string;
  country?: string;
  gps?: {
    lat: number;
    lon: number;
  };
};

export type LangField = {
  default?: string;
  en?: string;
  fr?: string;
};

export type ExternalIdsData = {
  type: string;
  id: string;
};

export type ObjectModel =
  | LightPublication
  | LightAuthor
  | LightProject
  | LightOrganization
  | Patent;

export type ApiTypes =
  | "publications"
  | "authors"
  | "projects"
  | "organizations"
  | "patents";
