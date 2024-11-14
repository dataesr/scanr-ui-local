import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

const getBooleanParam = (param: string, defaultValue = true) =>
  param ? (param.toLowerCase() === "true" ? true : false) : defaultValue

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const isIntegration = window.location.href.includes("integration")
  const integrationId = isIntegration ? searchParams.get("local") : undefined
  const integrationLang = searchParams.get("lang") || "fr"

  const integrationOptions = isIntegration
    ? {
        useGraphOnly: getBooleanParam(searchParams.get("useGraphOnly"), false),
        useTitle: getBooleanParam(searchParams.get("useTitle")),
        useSubtitle: getBooleanParam(searchParams.get("useSubtitle")),
        useClustersAnalytics: getBooleanParam(searchParams.get("useClustersAnalytics")),
        useClustersButton: getBooleanParam(searchParams.get("useClustersButton")),
        useSearchBar: getBooleanParam(searchParams.get("useSearch")),
        useFilters: getBooleanParam(searchParams.get("useFilters")),
        useExports: getBooleanParam(searchParams.get("useExports")),
        useBreadcrumb: false,
        useSelect: getBooleanParam(searchParams.get("useSelect")),
        useHeader: getBooleanParam(searchParams.get("useHeader")),
      }
    : {
        useGraphOnly: false,
        useTitle: true,
        useSubtitle: true,
        useClustersAnalytics: true,
        useClustersButton: true,
        useSearchBar: true,
        useFilters: true,
        useExports: true,
        useBreadcrumb: true,
        useSelect: true,
        useHeader: true,
      }

  const values = useMemo(() => {
    return { integrationId, integrationLang, integrationOptions }
  }, [integrationId, integrationLang, integrationOptions])
  return values
}
