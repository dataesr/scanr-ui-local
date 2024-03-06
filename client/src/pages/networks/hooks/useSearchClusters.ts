import { useSearchParams } from "react-router-dom"
import { filtersFromUrlToElasticQuery, parseSearchFiltersFromURL } from "../../../utils/filters"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../api/networks/search"

export default function useSearchClusters(networkTab: string, computeClusters: boolean) {
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q")
  const currentTab = searchParams.get("tab") || "authors"
  const currentFilters = parseSearchFiltersFromURL(searchParams.get("filters"))
  const filters = filtersFromUrlToElasticQuery(searchParams.get("filters"))

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", networkTab, computeClusters, currentQuery, filters],
    queryFn: () => networkSearch({ model: networkTab, query: currentQuery, options: { computeClusters }, filters }),
    enabled: Boolean(currentQuery !== null && networkTab === currentTab && computeClusters),
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
