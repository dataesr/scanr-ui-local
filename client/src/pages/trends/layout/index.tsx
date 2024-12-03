import { Col, Container, Row } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import TrendsHeader from "../components/header"
import TrendsPanel from "../components/panel"
import TrendsSelectSource from "../components/select-source"
import TrendsParameters from "../components/parameters"
import PublicationFilters from "../../search/components/publications/filters"
import TrendsFilters from "../components/filters"
import TrendsSearchBar from "../components/search-bar"

export default function TrendsLayout() {
  const intl = useIntl()

  return (
    <Container fluid>
      <TrendsHeader />
      <PublicationFilters />
      <Container>
        <Row gutters>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <TrendsPanel />
          </Col>
          <Col lg="4">
            <TrendsSearchBar label={intl.formatMessage({ id: "trends.search-bar.label" })} />
            <TrendsSelectSource />
            <TrendsFilters />
            <TrendsParameters />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
