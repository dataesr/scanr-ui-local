import { useQueryClient } from "@tanstack/react-query"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import { networkSearch } from "../../../api/networks/search/search"
import useOptions from "./useOptions"

export default function useSearchDataPrefetch() {
  const queryClient = useQueryClient()
  const { parameters } = useOptions()
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
