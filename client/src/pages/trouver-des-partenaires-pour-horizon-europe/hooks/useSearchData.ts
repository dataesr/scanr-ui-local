import { useSearchParams } from "react-router-dom";
import { filtersFromUrlToElasticQuery, parseSearchFiltersFromURL, stringifySearchFiltersForURL } from "../../../utils/filters";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { ElasticResult, SearchResponse } from "../../../types/commons";
import { LightOrganization } from "../../../types/organization";
import { searchOrganizationsForHe } from "../../../api/organizations/search/he";

type InfiniteResult = {
  total: number,
  results: ElasticResult<LightOrganization>[]
}
type InfiniteResponse = SearchResponse<LightOrganization>


export default function useSearchData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKeywords = searchParams.get('q');
  const currentFilters = parseSearchFiltersFromURL(searchParams.get('filters'));
  const filters = filtersFromUrlToElasticQuery(searchParams.get('filters'));
  const { data: dataFilters, isLoading: isLoadingFilters, isError: isErrorFilters } = useQuery({
    queryKey: ["he-organizations", "filters", currentKeywords, currentFilters],
    queryFn: () => {},
    enabled: currentKeywords?.length > 0,
  });  
  const {
    data,
    error,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<InfiniteResponse, unknown, InfiniteResult>({
    queryKey: ["he-organizations", currentKeywords, filters],
    queryFn: ({ pageParam }) => searchOrganizationsForHe({ cursor: pageParam, query: currentKeywords, filters }),
    getNextPageParam: (lastPage) => (lastPage?.data?.length === 10) ? lastPage.cursor : undefined,
    initialPageParam: undefined,
    enabled: currentKeywords?.length > 0,
    select: (data) => ({
      total: data.pages[0]?.total || 0,
      results: data.pages.flatMap((page) => page.data),
    }),
  })

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
    setSearchParams({ q: currentKeywords, filters: stringifySearchFiltersForURL([]) })
  }, [setSearchParams, currentKeywords])

  const values = useMemo(() => {
    return {
      handleQueryChange,
      handleFilterChange,
      clearFilters,
      total: data?.total,
      currentKeywords,
      currentFilters,
      filters: { data: dataFilters, isLoading: isLoadingFilters, isError: isErrorFilters},
      search: {
        data: data?.results,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetching,
      }
    }
  }, [
    data, error, isFetchingNextPage, fetchNextPage, hasNextPage,
    handleFilterChange, handleQueryChange, clearFilters,
    currentFilters, isFetching, dataFilters, isLoadingFilters,
    isErrorFilters, currentKeywords
  ])

  return values
}