import { Container, SearchBar } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"

type TrendsSearchBarArgs = {
  label?: string
  isLarge?: boolean
}

export default function TrendsSearchBar({ label = null, isLarge = false }: TrendsSearchBarArgs) {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()

  return (
    <Container fluid className="fr-mb-3w">
      {label && <label className="fr-label fr-mb-1w">{label}</label>}
      <SearchBar
        key={currentQuery}
        isLarge={isLarge}
        buttonLabel={intl.formatMessage({ id: "trends.search-bar.button-label" })}
        defaultValue={currentQuery || ""}
        placeholder={intl.formatMessage({ id: "trends.search-bar.placeholder" })}
        onSearch={(value) => {
          handleQueryChange(value)
        }}
      />
    </Container>
  )
}
