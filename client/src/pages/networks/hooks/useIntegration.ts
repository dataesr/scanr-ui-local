import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

const getBooleanParam = (param: string) => (param ? (param.toLowerCase() === "true" ? true : false) : true)

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const integrationId = window.location.href.includes("integration") ? searchParams.get("local") : undefined

  const integrationLang = searchParams.get("lang") || "fr"

  const integrationOptions = integrationId
    ? {
        useTitle: getBooleanParam(searchParams.get("useTitle")),
        useClustersAnalytics: getBooleanParam(searchParams.get("useAnalytics")),
        useClusterButton: getBooleanParam(searchParams.get("useButton")),
        useSearchBar: getBooleanParam(searchParams.get("useSearch")),
        useFilters: getBooleanParam(searchParams.get("useFilters")),
        useExports: getBooleanParam(searchParams.get("useExports")),
        useBreadcrumb: getBooleanParam(searchParams.get("useBreadcrumb")),
        useSelect: getBooleanParam(searchParams.get("useSelect")),
        useHeader: getBooleanParam(searchParams.get("useHeader")),
      }
    : {
        useTitle: true,
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
