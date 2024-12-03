import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useTrendsContext } from "../context"
import getPublicationsTrends from "../../../api/publications/trends"

export default function useTrends() {
  const { model, normalized } = useTrendsContext()
  const { data, error, isFetching } = useQuery({
    queryKey: ["trends", model, "publications", normalized],
    queryFn: () => getPublicationsTrends({ model: model, normalized: normalized }),
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
