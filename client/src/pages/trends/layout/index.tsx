import { Container } from "@dataesr/dsfr-plus"
import TrendsHeader from "../components/header"
import TrendsView from "../components/panel"
import PublicationFilters from "../../search/components/publications/filters"
import TrendsOptionsBar from "../components/options-bar"
import TrendsOptionsModals from "../components/options-bar/modals"

export default function TrendsLayout() {
  return (
    <Container fluid>
      <TrendsHeader />
      <TrendsOptionsBar />
      <TrendsOptionsModals />
      <PublicationFilters />
      <Container>
        <TrendsView />
      </Container>
    </Container>
  )
}
