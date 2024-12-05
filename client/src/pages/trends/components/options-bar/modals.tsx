import { Container } from "@dataesr/dsfr-plus"
import PublicationFilters from "../../../search/components/publications/filters"
import TrendsParametersModal from "../parameters/modal"
import TrendsSearchBarModal from "../search-bar/modal"
import TrendsSelectSourceModal from "../select-source/modal"
import TrendsSelectModelModal from "../select-model/modal"

export default function TrendsOptionsModals() {
  return (
    <Container fluid>
      <TrendsSearchBarModal />
      <TrendsSelectModelModal />
      <TrendsSelectSourceModal />
      <PublicationFilters />
      <TrendsParametersModal />
    </Container>
  )
}
