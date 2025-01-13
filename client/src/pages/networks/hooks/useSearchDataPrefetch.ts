import { useQueryClient } from "@tanstack/react-query"
import useParameters from "./useParameters"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import { networkSearch } from "../../../api/networks/search/search"

export default function useSearchDataPrefetch() {
  const queryClient = useQueryClient()
  const { parameters } = useParameters()
  const { locale } = useDSFRConfig()

  queryClient.prefetchQuery({
    queryKey: ["network", "domains", "", [], locale, parameters],
    queryFn: () =>
      networkSearch({
        model: "domains",
        query: "",
        lang: locale,
        parameters: parameters,
        filters: [],
      }),
  })
}
