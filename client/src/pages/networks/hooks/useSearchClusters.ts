import useUrl from "./useUrl"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../api/networks/search"

export default function useSearchClusters(networkTab: string, computeClusters: boolean) {
  const { currentQuery, currentTab, filters } = useUrl();

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
