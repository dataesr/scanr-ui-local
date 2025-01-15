import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCitationsTrends, getPublicationsTrends } from "../../../api/trends/publications"
import useUrl from "../../search/hooks/useUrl"
import { MAX_YEAR, MIN_YEAR } from "../config/years"
import { rangeArray } from "../../../utils/helpers"
import useOptions from "./useOptions"

const API_MAPPING = {
  publications: getPublicationsTrends,
  citations: getCitationsTrends,
}

export default function useTrends() {
  const { currentQuery, currentFilters, filters } = useUrl()
  const { currentModel, currentSource, normalized } = useOptions()

  const trendsYears = {
    min: Number(currentFilters?.year?.values?.[0]?.value || MIN_YEAR),
    max: Number(currentFilters?.year?.values?.[1]?.value || MAX_YEAR),
  }

  const { data, error, isFetching } = useQuery({
    queryKey: ["trends", currentSource, currentModel, currentQuery, currentModel, filters, normalized],
    queryFn: () =>
      API_MAPPING[currentSource]({
        model: currentModel,
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
