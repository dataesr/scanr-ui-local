import { Container, Row, Col } from "@dataesr/dsfr-plus"
import NetworkClusters from "../components/clusters"
import ClustersButton from "../components/button"
import NetworkFilters from "../components/filters"
import PublicationFilters from "../../search/components/publications/filters"
import NetworkExports from "../components/exports"
import ClustersAnalytics from "../components/analytics"
import NetworksHeader from "../components/header"
import NetworkTitle from "../components/title"
import NetworkCard from "../components/card"

export default function NetworksLayout() {
  return (
    <Container fluid>
      <NetworksHeader />
      <Container>
        <Row gutters>
          <Col xs="12" sm="8" lg="8">
            <NetworkTitle />
          </Col>
          <Col xs="12" sm="4" lg="4">
            <PublicationFilters />
            <NetworkFilters />
          </Col>
        </Row>
        <NetworkCard />
        <Row gutters>
          <Col xs="12" sm="8" lg="8">
            <ClustersButton />
          </Col>
          <Col xs="12" sm="4" lg="4">
            <NetworkExports />
          </Col>
        </Row>
        <Row gutters>
          <Col xs="12" sm="8" lg="8">
            <NetworkClusters />
          </Col>
          <Col xs="12" sm="4" lg="4">
            <ClustersAnalytics />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
