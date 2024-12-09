import { Container, Link, SearchBar, Tag, TagGroup, Text } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import useUrl from "../../../search/hooks/useUrl"
import { useIntl } from "react-intl"
import { networkQuery } from "../../config/query"

export default function NetworkSearchBarModal() {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()
  const id = "networks-options-search-bar-modal"

  return (
    <Modal id={id} size="lg" title={"Rechercher"}>
      <Container fluid className="fr-mb-4w">
        <SearchBar
          key={currentQuery}
          buttonLabel={intl.formatMessage({ id: "networks.search-bar.button-label" })}
          defaultValue={currentQuery || ""}
          placeholder={intl.formatMessage({ id: "networks.search-bar.placeholder" })}
          onSearch={(value) => {
            handleQueryChange(networkQuery(value))
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
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
      </Container>
    </Modal>
  )
}
