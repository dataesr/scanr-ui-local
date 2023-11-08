export function parseSearchFiltersFromURL(urlFilters) {
  if (!urlFilters) return [];
  return JSON.parse(decodeURIComponent(urlFilters));
}

export function stringifySearchFiltersForURL(filters) {
  if (!filters) return {};
  return encodeURIComponent(JSON.stringify(filters));
}

export function filtersToElasticQuery(filters) {
  return filters.map((el) => ({
    [el.type]: {
      [`${el.field}.keyword`]: el.value
    }
  }));
}

export function filtersFromUrlToElasticQuery(urlFilters) {
  const filters = parseSearchFiltersFromURL(urlFilters);
  return filtersToElasticQuery(filters);
}