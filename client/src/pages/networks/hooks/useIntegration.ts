import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const integrationId = window.location.href.includes("integration") ? searchParams.get("local") : undefined

  const integrationOptions = integrationId
    ? {
        displayTitle: searchParams.get("displayTitle") ?? true,
        displayClusters: searchParams.get("displayClusters") ?? true,
        displayClustersAnalytics: searchParams.get("displayClustersAnalytics") ?? true,
        displayClustersButton: searchParams.get("displayClustersButton") ?? true,
        enableSearch: searchParams.get("enableSearch") ?? true,
        enableFilters: searchParams.get("enableFilters") ?? true,
        enableExports: searchParams.get("enableExports") ?? true,
        singleTab: searchParams.get("singleTab") ?? false,
      }
    : {}

  const values = useMemo(() => {
    return { integrationId, integrationOptions }
  }, [integrationId, integrationOptions])
  return values
}
