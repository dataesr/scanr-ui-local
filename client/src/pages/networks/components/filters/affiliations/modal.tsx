import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../../components/modal"
import PublicationAuthorFilter from "../../../../search/components/publications/filters/authors"
import PublicationOrganizationsFilter from "../../../../search/components/publications/filters/organizations"
import PublicationCountriesFilter from "../../../../search/components/publications/filters/countries"

export default function NetworkFilterAffiliationsModal() {
  return (
    <Modal id={"networks-options-filters-affiliations-modal"} size="lg" title={"Affiliations"}>
      <Container fluid className="fr-mb-4w">
        <PublicationAuthorFilter />
        <hr className="fr-mt-3w" />
        <PublicationOrganizationsFilter />
        <hr className="fr-mt-3w" />
        <PublicationCountriesFilter />
      </Container>
    </Modal>
  )
}
