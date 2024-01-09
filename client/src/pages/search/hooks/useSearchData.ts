import { useLocation, useSearchParams } from "react-router-dom";
import { filtersFromUrlToElasticQuery, parseSearchFiltersFromURL, stringifySearchFiltersForURL } from "../utils/filters";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPublicationFilters, searchPublications } from "../../../api/publications";
import { useCallback, useMemo } from "react";
import { getAuthorsFilters, searchAuthors } from "../../../api/authors";
import { Publication, PublicationAggregations } from "../../../api/types/publication";
import { ElasticResult, SearchResponse } from "../../../api/types/commons";
import { Author, AuthorsAggregations } from "../../../api/types/author";
import { getOrganizationFilters, searchOrganizations } from "../../../api/organizations";
import { getProjectFilters, searchProjects } from "../../../api/projects";
import { Project, ProjectAggregations } from "../../../api/types/project";
import { Organization, OrganizationAggregations } from "../../../api/types/organization";

const API_MAPPING = {
  publications: {
    search: searchPublications,
    filter: getPublicationFilters,
  },
  authors: {
    search: searchAuthors,
    filter: getAuthorsFilters,
  },
  projects: {
    search: searchProjects,
    filter: getProjectFilters,
  },
  patents: {
    search: searchPublications,
    filter: getPublicationFilters,
  },
  organizations: {
    search: searchOrganizations,
    filter: getOrganizationFilters,
  },
}

type Api = keyof typeof API_MAPPING;
type ObjectModel = Publication | Author | Project | Organization;
type AggregationsModel = PublicationAggregations | OrganizationAggregations | ProjectAggregations | AuthorsAggregations;
type InfiniteResponse = SearchResponse<ObjectModel>
type InfiniteResult = {
  total: number,
  results: ElasticResult<ObjectModel>[]
}

export default function useSearchData() {
  const { pathname } = useLocation();
  const api = pathname.split('/')?.[2]
  const queryFn = API_MAPPING[api as Api]
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || "";
  const currentFilters = parseSearchFiltersFromURL(searchParams.get('filters'));
  const filters = filtersFromUrlToElasticQuery(searchParams.get('filters'));
  const { data: dataFilters, isLoading: isLoadingFilters, isError: isErrorFilters } = useQuery<AggregationsModel, unknown, AggregationsModel>({
    queryKey: [api, "filters", currentQuery],
    queryFn: () => queryFn.filter(currentQuery),
  });  
  const { data: dataAnalytics, isLoading: isLoadingAnalytics, isError: isErrorAnalytics } = useQuery<AggregationsModel, unknown, AggregationsModel>({
    queryKey: [api, "analytics", currentQuery, filters],
    queryFn: () => queryFn.filter(currentQuery, filters),
  });
  const {
    data,
    error,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<InfiniteResponse, unknown, InfiniteResult>({
    queryKey: [api, currentQuery, filters],
    queryFn: ({ pageParam }) => queryFn.search({ cursor: pageParam, query: currentQuery, filters }),
    getNextPageParam: (lastPage) => (lastPage?.data?.length === 10) ? lastPage.cursor : undefined,
    initialPageParam: undefined,
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
    setSearchParams({ q: currentQuery, filters: stringifySearchFiltersForURL([]) })
  }, [setSearchParams, currentQuery])

  const values = useMemo(() => {
    return {
      api,
      handleQueryChange,
      handleFilterChange,
      clearFilters,
      total: data?.total,
      currentQuery,
      currentFilters,
      filters: { data: dataFilters, isLoading: isLoadingFilters, isError: isErrorFilters},
      analytics: { data: dataAnalytics, isLoading: isLoadingAnalytics, isError: isErrorAnalytics},
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
    api, data, error, isFetchingNextPage, fetchNextPage, hasNextPage,
    handleFilterChange, handleQueryChange, clearFilters,
    currentFilters, isFetching, currentQuery, dataFilters, isLoadingFilters,
    isErrorFilters, dataAnalytics, isLoadingAnalytics, isErrorAnalytics
  ])

  return values
}