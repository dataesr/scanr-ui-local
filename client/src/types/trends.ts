export type TrendsViews = Array<TrendsView>
export type TrendsView = {
  id: string
  label: string
  order: string
  nextView?: string
}

export type TrendsFilters = Array<TrendsFilters>
export type TrendsFilter = Record<string, unknown>

export type TrendsArgs = {
  model: string
  query: string
  normalized: boolean
  filters?: TrendsFilters
}

