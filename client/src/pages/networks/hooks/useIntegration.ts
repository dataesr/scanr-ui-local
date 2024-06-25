import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

const getBooleanParam = (param: string) => (param ? (param.toLowerCase() === "true" ? true : false) : true)

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const integrationId = window.location.href.includes("integration") ? searchParams.get("local") : undefined

  const integrationOptions = integrationId
    ? {
        displayTitle: getBooleanParam(searchParams.get("displayTitle")),
        displayClustersAnalytics: getBooleanParam(searchParams.get("displayAnalytics")),
        displayClustersButton: getBooleanParam(searchParams.get("displayButton")),
        enableSearch: getBooleanParam(searchParams.get("enableSearch")),
        enableFilters: getBooleanParam(searchParams.get("enableFilters")),
        enableExports: getBooleanParam(searchParams.get("enableExports")),
        enableTabs: getBooleanParam(searchParams.get("enableTabs")),
      }
    : undefined

  const values = useMemo(() => {
    return { integrationId, integrationOptions }
  }, [integrationId, integrationOptions])
  return values
}
