import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const integrationId = window.location.href.includes("integration") ? searchParams.get("local") : undefined

  const integrationOptions = integrationId
    ? {
        displayTitle: !searchParams.has("hideTitle"),
        displayClustersAnalytics: !searchParams.has("hideAnalytics"),
        displayClustersButton: !searchParams.has("hideButton"),
        enableSearch: !searchParams.has("disableSearch"),
        enableFilters: !searchParams.has("disableFilters"),
        enableExports: !searchParams.has("disableExports"),
        singleTab: searchParams.get("singleTab") || false,
      }
    : undefined

  const values = useMemo(() => {
    return { integrationId, integrationOptions }
  }, [integrationId, integrationOptions])
  return values
}
