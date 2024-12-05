import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import NetworksSearchBar from "."

export default function NetworkSearchBarModal() {
  return (
    <Modal id={"networks-options-search-bar-modal"} size="lg" title={"Rechercher"}>
      <Container fluid className="fr-mb-4w">
        <NetworksSearchBar />
      </Container>
    </Modal>
  )
}
