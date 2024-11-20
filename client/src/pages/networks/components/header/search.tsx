import { Container, SearchBar } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"
import useIntegration from "../../hooks/useIntegration"
import { networkQuery } from "../../config/query"
import useParameters from "../../hooks/useParameters"

export default function NetworksSearchBar({ label = null, isLarge = false }) {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()
  const { resetParameters } = useParameters()
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showSearchBar === false) return null

  return (
    <Container fluid className="fr-mb-3w">
      {label && <label className="fr-label fr-mb-1w">{label}</label>}
      <SearchBar
        key={currentQuery}
        isLarge={isLarge}
        buttonLabel={intl.formatMessage({ id: "networks.search-bar.button-label" })}
        defaultValue={currentQuery || ""}
        placeholder={intl.formatMessage({ id: "networks.search-bar.placeholder" })}
        onSearch={(value) => {
          handleQueryChange(networkQuery(value))
          resetParameters()
        }}
      />
    </Container>
  )
}
