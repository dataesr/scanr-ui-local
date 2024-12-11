import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import TrendsSearchBar from "."
import { useIntl } from "react-intl"

export default function TrendsSearchBarModal() {
  const intl = useIntl()
  return (
    <Modal
      id={"trends-options-search-bar-modal"}
      size="lg"
      title={intl.formatMessage({ id: "trends.search-bar.modal.title" })}
    >
      <Container fluid className="fr-mb-4w">
        <TrendsSearchBar />
      </Container>
    </Modal>
  )
}
