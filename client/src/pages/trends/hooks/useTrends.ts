import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useTrendsContext } from "../context"
import { getPublicationsTrends, getCitationsTrends } from "../../../api/publications/trends"

const API_MAPPING = {
  publications: getPublicationsTrends,
  citations: getCitationsTrends,
}

export default function useTrends() {
  const { model, source, normalized } = useTrendsContext()
  const { data, error, isFetching } = useQuery({
    queryKey: ["trends", model, source, normalized],
    queryFn: () => API_MAPPING[source]({ model: model, normalized: normalized }),
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
