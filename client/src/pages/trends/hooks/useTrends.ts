import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useTrendsContext } from "../context"
import { getPublicationsTrends, getCitationsTrends } from "../../../api/publications/trends"
import useUrl from "../../search/hooks/useUrl"

const API_MAPPING = {
  publications: getPublicationsTrends,
  citations: getCitationsTrends,
}

export default function useTrends() {
  const { currentQuery, filters } = useUrl()
  const { source, normalized } = useTrendsContext()
  const { data, error, isFetching } = useQuery({
    queryKey: ["trends", currentQuery, filters, source, normalized],
    queryFn: () => API_MAPPING[source]({ model: "domains", query: currentQuery, filters: filters, normalized: normalized }),
  })

  const values = useMemo(() => {
    return {
      trends: data,
      isFetching: isFetching,
      error: error,
    }
  }, [data, isFetching, error])

  return values
}
