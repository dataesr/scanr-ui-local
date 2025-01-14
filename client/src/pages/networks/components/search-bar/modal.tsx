import { useState, useEffect } from "react"
import { Container, SearchBar, Tag, TagGroup, Text } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import useUrl from "../../../search/hooks/useUrl"
import useSearchExpansion from "../../hooks/useSearchExpansion"
import { useIntl } from "react-intl"
import { networkQuery } from "../../config/query"

export default function NetworkSearchBarModal() {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()
  const [query, setQuery] = useState(currentQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const { expansions } = useSearchExpansion(debouncedQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  const id = "networks-options-search-bar-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.search-bar.modal.title" })}>
      <Container fluid className="fr-mb-4w">
        <SearchBar
          key={currentQuery}
          buttonLabel={intl.formatMessage({ id: "networks.search-bar.button-label" })}
          defaultValue={currentQuery || ""}
          placeholder={intl.formatMessage({ id: "networks.search-bar.placeholder" })}
          onChange={(event) => setQuery((event.target as HTMLInputElement).value)}
          onSearch={(value) => {
            handleQueryChange(networkQuery(value))
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        />
      </Container>
      {expansions?.length && (
        <Container fluid className="fr-mb-4w">
          <Text size="sm" className="fr-mb-1w">
            {intl.formatMessage({ id: "networks.get-started.search-bar.suggestions" })}
          </Text>
          <TagGroup>
            {expansions.map((expansion, index) => (
              <Tag
                key={index}
                as="button"
                color="green-emeraude"
                icon="add-line"
                onClick={() => {
                  handleQueryChange(debouncedQuery + ` OR "${expansion}"`)
                  setDebouncedQuery(debouncedQuery + ` OR "${expansion}"`)
                }}
              >
                {expansion}
              </Tag>
            ))}
          </TagGroup>
        </Container>
      )}
    </Modal>
  )
}
