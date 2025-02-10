import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCitationsTrends, getPublicationsTrends } from "../../../api/trends/publications"
import useUrl from "../../search/hooks/useUrl"
import { MAX_YEAR, MIN_YEAR } from "../config/years"
import { rangeArray } from "../../../utils/helpers"
import useOptions from "./useOptions"
import { TrendsRanking } from "../../../types/trends"
import { useTrendsContext } from "../context"

const API_MAPPING = {
  publications: getPublicationsTrends,
  citations: getCitationsTrends,
}

export default function useTrends() {
  const { currentQuery, currentFilters, filters } = useUrl()
  const { currentModel, currentSource, normalized, currentPage } = useOptions()
  const { includes } = useTrendsContext()

  const trendsYears = {
    min: Number(currentFilters?.year?.values?.[0]?.value || MIN_YEAR),
    max: Number(currentFilters?.year?.values?.[1]?.value || MAX_YEAR),
  }

  const { data, error, isFetching } = useQuery<TrendsRanking>({
    queryKey: ["trends", currentSource, currentModel, currentQuery, currentPage, filters, normalized, includes],
    queryFn: () =>
      API_MAPPING[currentSource]({
        model: currentModel,
        query: currentQuery,
        page: currentPage,
        years: rangeArray(trendsYears.min, trendsYears.max),
        filters: filters,
        normalized: normalized,
        includes: includes,
      }),
    placeholderData: (previousData, previousQuery) =>
      previousQuery?.queryKey && previousQuery.queryKey[1] === currentSource ? previousData : undefined,
  })

  const values = useMemo(() => {
    return {
      trends: data,
      trendsYears: trendsYears,
      error: error,
      isFetching: isFetching,
    }
  }, [data, trendsYears, error, isFetching, error])

  return values
}
