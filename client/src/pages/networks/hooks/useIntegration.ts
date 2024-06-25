import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import useClusters from "./useClusters"

const getBooleanParam = (param: string) => (param ? (param.toLowerCase() === "true" ? true : false) : true)

export default function useIntegration() {
  const { clusters: displayClusters } = useClusters()
  const [searchParams] = useSearchParams()
  const integrationId = window.location.href.includes("integration") ? searchParams.get("local") : undefined

  const integrationLang = searchParams.get("lang") || "fr"

  const integrationOptions = integrationId
    ? {
        displayTitle: getBooleanParam(searchParams.get("displayTitle")),
        displayClustersAnalytics: getBooleanParam(searchParams.get("displayAnalytics")),
        enableClustersButton: getBooleanParam(searchParams.get("enableButton")),
        enableSearch: getBooleanParam(searchParams.get("enableSearch")),
        enableFilters: getBooleanParam(searchParams.get("enableFilters")),
        enableExports: getBooleanParam(searchParams.get("enableExports")),
        enableTabs: getBooleanParam(searchParams.get("enableTabs")),
      }
    : undefined

  const displaySidePanel =
    integrationOptions?.enableFilters ||
    integrationOptions?.enableExports ||
    integrationOptions?.enableClustersButton ||
    (displayClusters && integrationOptions?.displayClustersAnalytics)

  const values = useMemo(() => {
    return { integrationId, integrationLang, integrationOptions, displaySidePanel }
  }, [integrationId, integrationLang, integrationOptions, displaySidePanel])
  return values
}
