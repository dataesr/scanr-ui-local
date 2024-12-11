import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"


export const DEFAULT_INTEGRATION = {
  showGraphOnly: false,
  showTitle: true,
  showSubtitle: true,
  showClustersAnalytics: true,
  showClustersButton: true,
  showSearchBar: true,
  showFilters: true,
  showExports: true,
  showBreadcrumb: true,
  showSelect: true,
  showHeader: true,
  graphHeight: "600px",
}

const url = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/locals.json"

export function getBsoLocals() {
  const { data } = useSuspenseQuery({
    queryKey: ["bso", "locals"],
    queryFn: () => fetch(url).then((response) => (response.ok ? response.json() : {})),
  })

  const values = useMemo(() => {
    return data
  }, [data])

  return values
}