import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import TrendsSearchBar from "."

export default function TrendsSearchBarModal() {
  return (
    <Modal id={"trends-options-search-bar-modal"} size="lg" title={"Rechercher"}>
      <Container fluid className="fr-mb-4w">
        <TrendsSearchBar />
      </Container>
    </Modal>
  )
}
