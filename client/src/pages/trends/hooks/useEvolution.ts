import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getPublicationsEvolution } from "../../../api/trends/publications"
import { useTrendsContext } from "../context"
import useUrl from "../../search/hooks/useUrl"
import { MAX_YEAR, MIN_YEAR } from "../config/years"
import { rangeArray } from "../../../utils/helpers"

export default function useEvolution() {
  const { currentQuery, currentFilters, filters } = useUrl()
  const { model, source, normalized } = useTrendsContext()

  const trendsYears = {
    min: Number(currentFilters?.year?.values?.[0]?.value || MIN_YEAR),
    max: Number(currentFilters?.year?.values?.[1]?.value || MAX_YEAR),
  }

  const { data, error, isFetching } = useQuery({
    queryKey: ["evolution", source, model, currentQuery, model, filters, normalized],
    queryFn: () =>
      getPublicationsEvolution({
        model: model,
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
