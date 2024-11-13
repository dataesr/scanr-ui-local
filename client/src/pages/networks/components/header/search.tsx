import { SearchBar } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"
import useIntegration from "../../hooks/useIntegration"
import { networkQuery } from "../../config/query"

export default function NetworksSearchBar() {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.useSearchBar === false) return null

  return (
    <SearchBar
      key={currentQuery}
      isLarge
      buttonLabel={intl.formatMessage({ id: "networks.top.main-search-bar" })}
      defaultValue={currentQuery || ""}
      placeholder={intl.formatMessage({ id: "networks.top.main-search-bar-placeholder" })}
      onSearch={(value) => {
        handleQueryChange(networkQuery(value))
      }}
    />
  )
}
