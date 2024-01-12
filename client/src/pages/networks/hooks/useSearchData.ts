import { useSearchParams } from "react-router-dom"
import {
  filtersFromUrlToElasticQuery,
  parseSearchFiltersFromURL,
  stringifySearchFiltersForURL,
} from "../../search/utils/filters"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { PublicationAggregations } from "../../../api/types/publication"
import { networkFilter, networkSearch } from "../../../api/network"

export default function useSearchData(networkTab = "authors") {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""
  console.log("currentQuery", currentQuery)
  console.log("currentTab", networkTab)

  const currentFilters = parseSearchFiltersFromURL(searchParams.get("filters"))
  const filters = filtersFromUrlToElasticQuery(searchParams.get("filters"))
  const {
    data: dataFilters,
    isLoading: isLoadingFilters,
    isError: isErrorFilters,
  } = useQuery<PublicationAggregations, unknown, PublicationAggregations>({
    queryKey: ["network", "filters", currentQuery],
    queryFn: () => networkFilter(currentQuery),
  })
  console.log("filters", filters)

  const handleQueryChange = useCallback(
    (query) => {
      setSearchParams({ q: query })
    },
    [setSearchParams]
  )

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", networkTab, currentQuery, filters],
    queryFn: () => networkSearch({ aggBy: networkTab, query: currentQuery, filters }),
  })
  console.log("networkSearch", data)

  const handleFilterChange = useCallback(
    (field, value, filterType = "terms") => {
      const prev = currentFilters
      const types: Record<string, any>[] = prev.find((el) => el.field === field)?.value || []
      const nextTypes = types.includes(value) ? types.filter((el) => el !== value) : [...types, value]
      let nextFilters: Record<string, unknown>[]
      if (!nextTypes.length) {
        nextFilters = prev.filter((el) => el.field !== field)
      } else {
        nextFilters = [...prev.filter((el) => el.field !== field), { field: field, value: nextTypes, type: filterType }]
      }

      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters))
      setSearchParams(searchParams)
    },
    [currentFilters, searchParams, setSearchParams]
  )

  const clearFilters = useCallback(() => {
    setSearchParams({ q: currentQuery, filters: stringifySearchFiltersForURL([]) })
  }, [setSearchParams, currentQuery])

  const values = useMemo(() => {
    return {
      handleQueryChange,
      handleFilterChange,
      clearFilters,
      currentQuery,
      currentFilters,
      search: { data: data, isFetching, error },
      filters: { data: dataFilters, isLoading: isLoadingFilters, isError: isErrorFilters },
    }
  }, [
    handleQueryChange,
    handleFilterChange,
    clearFilters,
    currentQuery,
    currentFilters,
    data,
    isFetching,
    error,
    dataFilters,
    isLoadingFilters,
    isErrorFilters,
  ])

  return values
}
