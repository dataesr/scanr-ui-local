import useUrl from "./useUrl"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../api/networks/search"

export default function useSearchData(networkTab: string) {
  const { currentQuery, currentTab, filters } = useUrl();

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", networkTab, currentQuery, filters],
    queryFn: () => networkSearch({ model: networkTab, query: currentQuery, options: { computeClusters: false }, filters }),
    enabled: Boolean(currentQuery !== null && networkTab === currentTab),
  })

  const values = useMemo(() => {
    return {
      currentQuery,
      filters,
      search: { data: data, isFetching, error },
    }
  }, [currentQuery, filters, data, isFetching, error])

  return values
}
