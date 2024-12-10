import { useLocation, useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { NetworksIntegrationOptions } from "../../../types/network"
import { getBooleanParam } from "../utils"
import { DEFAULT_INTEGRATION } from "../integration/config"

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const isIntegration = pathname.split("/").includes("integration")
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
        graphHeight: searchParams.get("graphHeight") || DEFAULT_INTEGRATION.graphHeight,
      }
    : DEFAULT_INTEGRATION

  const values = useMemo(() => {
    return { integrationId, integrationLang, integrationOptions }
  }, [integrationId, integrationLang, integrationOptions])
  return values
}
