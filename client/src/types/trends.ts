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
  years: Array<number>
  normalized: boolean
  filters?: TrendsFilters
}

export type TrendsIntegrationOptions = {
  showTrendsOnly: boolean
  showHeader: boolean
  showTitle: boolean
  showBreadcrumb: boolean
  showOptionsBar: boolean
  showSearchBar: boolean
  showSelectModel: boolean
  showSelectSource: boolean
  showFilters: boolean
  showParameters: boolean
  showExports: boolean
}