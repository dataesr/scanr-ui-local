import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { WikipediaResult } from "../../../components/wiki/types"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import { getWikidataPreviews } from "../../../components/wiki/api"
import { useTrendsContext } from "../context"
import useTrends from "./useTrends"

export default function useWikidata() {
  const { locale } = useDSFRConfig()
  const { view } = useTrendsContext()
  const { trends } = useTrends()
  const codes = trends?.[view].map((item) => ({ code: item.id }))

  const {
    data: wikis,
    isFetching,
    error,
  } = useQuery<WikipediaResult[]>({
    queryKey: ["wikidatas", codes.map((c) => c.code), locale],
    queryFn: () => getWikidataPreviews(codes, locale),
    enabled: !!codes?.length,
  })

  const values = useMemo(() => {
    return {
      wikis: wikis,
      isFetching: isFetching,
      error: error,
    }
  }, [wikis, isFetching, error])

  return values
}
