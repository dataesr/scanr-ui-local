import { useCallback, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { 
  filtersFromUrlToElasticQuery, parseSearchFiltersFromURL, stringifySearchFiltersForURL
} from "../../../utils/filters";
import { ApiTypes } from "../../../types/commons";


export default function useUrl() {
  const { pathname } = useLocation();
  const api = pathname.split('/')?.[2] as ApiTypes;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || "";
  const currentFilters = parseSearchFiltersFromURL(searchParams.get('filters'));
  const filters = filtersFromUrlToElasticQuery(searchParams.get('filters'));

  const handleFilterChange = useCallback((field, value, filterType = "terms") => {
    const prev = currentFilters;
    const types: Record<string, any>[] = prev.find((el) => el.field === field)?.value || [];
    const nextTypes = types.includes(value) ? types.filter((el) => el !== value) : [...types, value];
    let nextFilters: Record<string, unknown>[];
    if (!nextTypes.length) {
      nextFilters = prev.filter((el) => el.field !== field)
    } else {
      nextFilters = [...prev.filter((el) => el.field !== field), { field: field, value: nextTypes, type: filterType }]
    }
    
    searchParams.set('filters', stringifySearchFiltersForURL(nextFilters));
    setSearchParams(searchParams);
  }, [currentFilters, searchParams, setSearchParams])

  const handleQueryChange = useCallback((query) => {
    setSearchParams({ q: query })
  }, [setSearchParams])

  const clearFilters = useCallback(() => {
    setSearchParams({ q: currentQuery, filters: stringifySearchFiltersForURL([]) })
  }, [setSearchParams, currentQuery])

  const values = useMemo(() => {
    return {
      api,
      handleQueryChange,
      handleFilterChange,
      clearFilters,
      currentQuery,
      currentFilters,
      filters,
    }
  }, [
    api, handleFilterChange, handleQueryChange, clearFilters,
    currentFilters, filters, currentQuery
  ])

  return values
}