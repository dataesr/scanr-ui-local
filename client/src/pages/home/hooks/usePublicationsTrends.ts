import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import getPublicationsTrends from "../../../api/publications/trends"

export default function usePublicationsTrends() {
  const { data, error, isFetching } = useQuery({
    queryKey: ["publications", "trends"],
    queryFn: () => getPublicationsTrends(),
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
