import { Container } from "@dataesr/dsfr-plus"
import NetworkSearchBarModal from "../search-bar/modal"
import NetworkSelectModelModal from "../select-model/modal"
import NetworkSelectSourceModal from "../select-source/modal"
import NetworkParametersModal from "../parameters/modal"
import PublicationFilters from "../../../search/components/publications/filters"

export default function NetworksOptionsModals() {
  return (
    <Container fluid>
      <NetworkSearchBarModal />
      <NetworkSelectModelModal />
      <NetworkSelectSourceModal />
      <PublicationFilters />
      <NetworkParametersModal />
    </Container>
  )
}
