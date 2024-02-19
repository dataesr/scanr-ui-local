export function parseSearchFiltersFromURL(urlFilters: string | null): Record<string, any>[] {
  if (!urlFilters) return [];
  return JSON.parse(decodeURIComponent(urlFilters));
}

export function stringifySearchFiltersForURL(filters: Record<string, any>[]): string {
  if (!filters) return "";
  return encodeURIComponent(JSON.stringify(filters));
}

function fromFilterToElasticQuery(filter: Record<string, any>): Record<string, unknown> {
  if (filter.type ==="bool") {
    return ({
      terms: {
        [filter.field]: filter.value
      }
    })
  }
  return ({
    [filter.type]: {
      [`${filter.field}.keyword`]: filter.value
    }
  })
}

export function filtersToElasticQuery(filters: Record<string, any>[]): Record<string, unknown>[] {
  return filters.flatMap((el) => {
    if (!el?.value || !el?.type) return [];
    if (el.operator === "and") {
      el.value.map((value: string) => {
        return fromFilterToElasticQuery({ field: el.field, value: [value], type: el.type });
      })
    }
    return [fromFilterToElasticQuery(el)];
  });
}

export function filtersFromUrlToElasticQuery(urlFilters: string | null): Record<string, unknown>[] {
  if (!urlFilters) return [];
  const filters = parseSearchFiltersFromURL(urlFilters);
  return filtersToElasticQuery(filters);
}