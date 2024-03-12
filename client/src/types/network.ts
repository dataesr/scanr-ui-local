import { LangField } from "./commons"

export type Network = {
  network: NetworkData
  config?: NetworkConfig
}
export type NetworkData = {
  items: Array<any>
  links: Array<any>
  clusters?: Array<any>
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
  query?: string
  options?: {
    computeClusters?: boolean
  }
  filters?: Record<string, unknown>[]
}
export type NetworkHitsBody = {
  size: number
  query: any
  _source: Array<string>
}

export type Community = {
  index: number
  label: string
  ids: Array<string>
  size: number
  maxYear?: number
  maxWeightNodes?: Array<string>
  domains?: any
}
export type Communities = Array<Community>

export type NetworkHit = {
  id: string
  title: string
  type: string
  isOa: boolean
  domains: any
}
export type NetworkHits = Array<NetworkHit>

export type ElasticDomain = {
  label: LangField
  count: number
}
export type ElasticDomains = Array<ElasticDomain>
export type ElasticHit = {
  id: string
  title?: LangField
  productionType?: string
  isOa?: boolean
  domains?: ElasticDomains
  year?: number
}
export type ElasticHits = Array<ElasticHit>
