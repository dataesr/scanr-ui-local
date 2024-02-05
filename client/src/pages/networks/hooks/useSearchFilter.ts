import { useSearchParams } from "react-router-dom"
import { parseSearchFiltersFromURL, stringifySearchFiltersForURL } from "../../../utils/filters"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { PublicationAggregations } from "../../../types/publication"
import { networkFilter } from "../../../api/network"

export default function useSearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""
  const currentTab = searchParams.get("tab") || "authors"

  const currentFilters = parseSearchFiltersFromURL(searchParams.get("filters"))
  const {
    data: dataFilters,
    isLoading: isLoadingFilters,
    isError: isErrorFilters,
  } = useQuery<PublicationAggregations, unknown, PublicationAggregations>({
    queryKey: ["network", "filters", currentTab, currentQuery],
    queryFn: () => networkFilter({ agg: currentTab, query: currentQuery }),
  })

  const handleQueryChange = useCallback(
    (query) => {
      searchParams.set("q", query)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

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
      // TODO: Set to zero for know to make build pass
      total: 0,
      handleQueryChange,
      handleFilterChange,
      clearFilters,
      currentQuery,
      currentFilters,
      filters: { data: dataFilters, isLoading: isLoadingFilters, isError: isErrorFilters },
    }
  }, [
    handleQueryChange,
    handleFilterChange,
    clearFilters,
    currentQuery,
    currentFilters,
    dataFilters,
    isLoadingFilters,
    isErrorFilters,
  ])

  return values
}
