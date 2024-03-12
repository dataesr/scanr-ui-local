import { useSearchParams } from "react-router-dom"
import useUrl from "../../search/hooks/useUrl"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../api/networks/search"

export default function useSearchClusters(networkTab: string, computeClusters: boolean) {
  const { filters } = useUrl();
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q")
  const currentTab = searchParams.get("tab") || "authors"

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", networkTab, computeClusters, currentQuery, filters],
    queryFn: () => networkSearch({ model: networkTab, query: currentQuery, options: { computeClusters }, filters }),
    enabled: Boolean(currentQuery !== null && networkTab === currentTab && computeClusters),
  })

  const values = useMemo(() => {
    return {
      search: { data: data, isFetching, error },
    }
  }, [data, isFetching, error])

  return values
}
