import { useQuery } from "@tanstack/react-query"
import useUrl from "../../search/hooks/useUrl"
import { mistralAgentCompletion } from "../../../api/networks/network/mistralai"
import { useMemo } from "react"

export default function useSearchExpansion() {
  const { currentQuery } = useUrl()

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", "expansion", currentQuery],
    queryFn: () =>
      mistralAgentCompletion({
        query: currentQuery,
        agentId: "ag:03ee88d7:20241211:extend-search:042576a9",
      }),
    enabled: currentQuery?.length > 3,
  })

  const values = useMemo(() => {
    return { expansions: data as Array<string>, isFetching, error }
  }, [data, isFetching, error])

  return values
}
