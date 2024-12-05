import { Col, Container, Row } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import TrendsHeader from "../components/header"
import TrendsView from "../components/panel"
import TrendsSelectSource from "../components/select-source"
import TrendsParameters from "../components/parameters"
import TrendsFilters from "../components/filters"
import TrendsSearchBar from "../components/search-bar"
import PublicationFilters from "../../search/components/publications/filters"
import TrendsOptionsBar from "../components/options-bar"
import TrendsOptionsModals from "../components/options-bar/modals"

export default function TrendsLayout() {
  const intl = useIntl()

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
