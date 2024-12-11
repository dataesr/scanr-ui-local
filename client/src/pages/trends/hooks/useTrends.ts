import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTrendsContext } from "../context"
import { getPublicationsTrends, getCitationsTrends } from "../../../api/publications/trends"
import useUrl from "../../search/hooks/useUrl"
import { MAX_YEAR, MIN_YEAR } from "../config/years"
import { rangeArray } from "../../../utils/helpers"

const API_MAPPING = {
  publications: getPublicationsTrends,
  citations: getCitationsTrends,
}

export default function useTrends() {
  const { currentQuery, currentFilters, filters } = useUrl()
  const { source, normalized } = useTrendsContext()

  const trendsYears = {
    min: Number(currentFilters?.year?.values?.[0]?.value || MIN_YEAR),
    max: Number(currentFilters?.year?.values?.[1]?.value || MAX_YEAR),
  }

  const { data, error, isFetching } = useQuery({
    queryKey: ["trends", currentQuery, filters, source, normalized],
    queryFn: () =>
      API_MAPPING[source]({
        model: "domains",
        query: currentQuery,
        years: rangeArray(trendsYears.min, trendsYears.max),
        filters: filters,
        normalized: normalized,
      }),
  })

  const values = useMemo(() => {
    return {
      trends: data,
      trendsYears: trendsYears,
      isFetching: isFetching,
      error: error,
    }
  }, [data, trendsYears, isFetching, error])

  return values
}
