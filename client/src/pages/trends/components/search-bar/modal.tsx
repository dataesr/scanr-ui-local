import { Container, SearchBar } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"

export default function TrendsSearchBarModal() {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()

  return (
    <Modal
      id={"trends-options-search-bar-modal"}
      size="lg"
      title={intl.formatMessage({ id: "trends.search-bar.modal.title" })}
    >
      <Container fluid className="fr-mb-4w">
        <SearchBar
          key={currentQuery}
          buttonLabel={intl.formatMessage({ id: "trends.search-bar.button-label" })}
          defaultValue={currentQuery}
          placeholder={intl.formatMessage({ id: "trends.search-bar.placeholder" })}
          onSearch={(value) => {
            handleQueryChange(value)
          }}
        />
      </Container>
    </Modal>
  )
}
