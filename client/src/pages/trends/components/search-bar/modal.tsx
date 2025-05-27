import { Button, Container, SearchBar } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"

export default function TrendsSearchBarModal() {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()

  const id = "trends-options-search-bar-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "trends.search-bar.modal.title" })}>
      <Container fluid className="fr-mb-4w  fr-pb-4w">
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
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", justifyContent: "right" }}>
        <Button aria-controls={id}>{intl.formatMessage({ id: "trends.search-bar.modal.display" })}</Button>
      </div>
    </Modal>
  )
}
