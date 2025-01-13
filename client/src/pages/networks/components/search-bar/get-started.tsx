import { SearchBar, Tag, TagGroup, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"
import { networkQuery } from "../../config/query"
import NetworkGetStartedPage from "../get-started/template"
import useGetStarted from "../../hooks/useGetStarted"

export default function NetworkSearchBarGetStarted() {
  const intl = useIntl()
  const { handlePageChange } = useGetStarted()
  const { currentQuery, handleQueryChange } = useUrl()

  return (
    <NetworkGetStartedPage title={intl.formatMessage({ id: "networks.get-started.search-bar.title" })}>
      <Text>{intl.formatMessage({ id: "networks.get-started.search-bar.description" })}</Text>
      <SearchBar
        className="fr-mb-4w"
        isLarge
        buttonLabel={intl.formatMessage({ id: "networks.search-bar.button-label" })}
        placeholder={intl.formatMessage({ id: "networks.search-bar.placeholder" })}
        defaultValue={currentQuery}
        onSearch={(value) => {
          handlePageChange({ q: networkQuery(value) })
        }}
      />
      <Text size="sm" className="fr-mb-1w">
        {intl.formatMessage({ id: "networks.get-started.search-bar.examples" })}
      </Text>
      <TagGroup>
        <Tag as="button" onClick={() => handleQueryChange("*")}>
          {"Tout rechercher"}
        </Tag>
        <Tag as="button" onClick={() => handleQueryChange('"quantum mechanics" AND dna')}>
          {'"quantum mechanics" AND dna'}
        </Tag>
        <Tag as="button" onClick={() => handleQueryChange("forest NOT (cosmology OR random)")}>
          {"forest NOT (cosmology OR random)"}
        </Tag>
        <Tag
          as="button"
          onClick={() => handleQueryChange('("climate model"  OR "climate models") AND NOT (mars  OR saturne)')}
        >
          {'("climate model"  OR "climate models") AND NOT (mars  OR saturn)'}
        </Tag>
      </TagGroup>
    </NetworkGetStartedPage>
  )
}
