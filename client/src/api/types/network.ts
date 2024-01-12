import { Aggregation } from "./commons"

export type Network = {
  items: object[]
  links: object[]
}

export type NetworkSearchBody = {
  size: number
  query: any
  aggs: any
}
export type NetworkSearchArgs = {
  agg: string
  query?: string | unknown
  filters?: Record<string, unknown>[]
}
export type NetworkFilterArgs = {
  agg: string
  query?: string | unknown
}

export type NetworkAggregation = {
  byCoAuthors: Aggregation[]
  byCoInstitutions: Aggregation[]
  byCoStructures: Aggregation[]
  byCoDomains: Aggregation[]
}

export type NetworkVosConfig = {
  network: Network
  config?: {
    parameters: object[]
    color_schemes?: object[]
    terminology?: object[]
    templates?: object[]
    styles?: object[]
  }
  info?: {
    title: string
    description: string
  }
}
