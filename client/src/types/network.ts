import { Aggregation } from "./commons"

export type Network = {
  network: NetworkData
  config?: NetworkConfig
}

export type NetworkData = {
  items: object[]
  links: object[]
  clusters?: any
}

export type NetworkConfig = {
  terminology?: object
  color_schemes?: object
  templates?: object
  styles?: object
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
