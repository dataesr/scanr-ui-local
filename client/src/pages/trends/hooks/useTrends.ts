import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import getPublicationsTrends from "../../../api/publications/trends"
import { useTrendsContext } from "../context"

export default function useTrends() {
  const { normalized } = useTrendsContext()
  const { data, error, isFetching } = useQuery({
    queryKey: ["trends", "publications", normalized],
    queryFn: () => getPublicationsTrends({ normalized: normalized }),
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
