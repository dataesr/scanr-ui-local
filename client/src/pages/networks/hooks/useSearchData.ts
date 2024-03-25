import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import useUrl from "../../search/hooks/useUrl"
import useTab from "./useTab"
import { networkSearch } from "../../../api/networks/search/search"

export default function useSearchData(networkTab: string, computeClusters: boolean) {
  const { currentQuery, filters } = useUrl()
  const { currentTab } = useTab()

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", networkTab, currentQuery, filters, computeClusters],
    queryFn: () => networkSearch({ model: networkTab, query: currentQuery, options: { computeClusters: computeClusters }, filters }),
    enabled: Boolean(currentQuery && networkTab === currentTab),
  })

  const values = useMemo(() => {
    return {
      currentQuery,
      filters,
      search: { data, isFetching, error },
    }
  }, [currentQuery, filters, data, isFetching, error])

  return values
}
