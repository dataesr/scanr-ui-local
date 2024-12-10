import { Link, SearchBar, Tag, TagGroup, Text } from "@dataesr/dsfr-plus"
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
    <NetworkGetStartedPage title={"Que recherchez vous ?"}>
      <Text>{"Définissez le périmètre du corpus à analyser grâce à une recherche dans nos bases de données."}</Text>
      <SearchBar
        isLarge
        buttonLabel={intl.formatMessage({ id: "networks.search-bar.button-label" })}
        placeholder={intl.formatMessage({ id: "networks.search-bar.placeholder" })}
        defaultValue={currentQuery}
        onSearch={(value) => {
          handlePageChange({ q: networkQuery(value) })
        }}
      />
      <TagGroup className="fr-mt-2w">
        <Tag as="button" onClick={() => handleQueryChange('"Exemple 1"')}>
          {"Exemple 1"}
        </Tag>
        <Tag as="button" onClick={() => handleQueryChange('"Exemple 2" AND "Example 3"')}>
          {'"Exemple 2" AND "Example 3"'}
        </Tag>
        <Tag as="button" onClick={() => handleQueryChange('("Exemple 4" AND "Exemple 5") OR ("Example 6")')}>
          {'("Exemple 4" AND "Exemple 5") OR ("Example 6")'}
        </Tag>
      </TagGroup>
      <Text size="sm" className="fr-mt-3w">
        {"La fonction de recherche utilise le moteur Elasticsearch : "}
        <Link
          target="_blank"
          href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html"
        >
          {"voir la documentation"}
        </Link>
      </Text>
    </NetworkGetStartedPage>
  )
}
