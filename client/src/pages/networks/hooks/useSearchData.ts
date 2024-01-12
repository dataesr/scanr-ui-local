import { useSearchParams } from "react-router-dom"
import { filtersFromUrlToElasticQuery, parseSearchFiltersFromURL } from "../../search/utils/filters"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../api/network"

export default function useSearchData(networkTab?: string) {
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""
  const currentTab = searchParams.get("tab") || "authors"

  const currentFilters = parseSearchFiltersFromURL(searchParams.get("filters"))
  const filters = filtersFromUrlToElasticQuery(searchParams.get("filters"))

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", networkTab, currentQuery, filters],
    queryFn: () => networkSearch({ agg: networkTab, query: currentQuery, filters }),
    enabled: networkTab === currentTab,
  })

  const values = useMemo(() => {
    return {
      currentQuery,
      currentFilters,
      search: { data: data, isFetching, error },
    }
  }, [currentQuery, currentFilters, data, isFetching, error])

  return values
}
