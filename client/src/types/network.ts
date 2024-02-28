import { Aggregation } from "./commons"

export type vosViewerData = {
  network: Network
  config: any
}

export type Network = {
  items: object[]
  links: object[]
  clusters?: any
}

export type NetworkSearchBody = {
  size: number
  query: any
  aggs: any
}

export type NetworkSearchArgs = {
  model: string
  query?: string | unknown
  filters?: Record<string, unknown>[]
}

export type NetworkFilterArgs = {
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
