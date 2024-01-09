export function parseSearchFiltersFromURL(urlFilters: string | null): Record<string, any>[] {
  if (!urlFilters) return [];
  return JSON.parse(decodeURIComponent(urlFilters));
}

export function stringifySearchFiltersForURL(filters: Record<string, any>[]): string {
  if (!filters) return "";
  return encodeURIComponent(JSON.stringify(filters));
}

export function filtersToElasticQuery(filters: Record<string, any>[]): Record<string, unknown>[] {
  return filters.map((el) => ({
    [el.type]: {
      [`${el.field}.keyword`]: el.value
    }
  }));
}

export function filtersFromUrlToElasticQuery(urlFilters: string | null): Record<string, unknown>[] {
  if (!urlFilters) return [];
  const filters = parseSearchFiltersFromURL(urlFilters);
  return filtersToElasticQuery(filters);
}