import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { NetworksIntegrationOptions } from "../../../types/network"
import { getBooleanParam } from "../utils"

const DEFAULT_INTEGRATION = {
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
  graphHeight: "700px",
}

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const isIntegration = window.location.href.includes("integration")
  const integrationId = isIntegration ? searchParams.get("local") : undefined
  const integrationLang = searchParams.get("lang") || "fr"

  const integrationOptions: NetworksIntegrationOptions = isIntegration
    ? {
        showGraphOnly: getBooleanParam(searchParams.get("showGraphOnly"), false),
        showTitle: getBooleanParam(searchParams.get("showTitle")),
        showSubtitle: getBooleanParam(searchParams.get("showSubtitle")),
        showClustersAnalytics: getBooleanParam(searchParams.get("showClustersAnalytics")),
        showClustersButton: getBooleanParam(searchParams.get("showClustersButton")),
        showSearchBar: getBooleanParam(searchParams.get("useSearch")),
        showFilters: getBooleanParam(searchParams.get("showFilters")),
        showExports: getBooleanParam(searchParams.get("showExports")),
        showBreadcrumb: false,
        showSelect: getBooleanParam(searchParams.get("showSelect")),
        showHeader: getBooleanParam(searchParams.get("showHeader")),
        graphHeight: searchParams.get("graphHeight") || "500px",
      }
    : DEFAULT_INTEGRATION

  const values = useMemo(() => {
    return { integrationId, integrationLang, integrationOptions }
  }, [integrationId, integrationLang, integrationOptions])
  return values
}
