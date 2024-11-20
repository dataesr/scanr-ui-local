import { Container, Row, Col } from "@dataesr/dsfr-plus"
import PublicationFilters from "../../search/components/publications/filters"
import NetworksHeader from "../components/header"
import NetworkFilters from "../components/filters"
import NetworkCard from "../components/graph/card"
import ClustersButton from "../components/clusters/button"
import NetworkClusters from "../components/clusters"
import NetworkAnalytics from "../components/clusters/analytics"
import NetworkExports from "../components/exports"
import useIntegration from "../hooks/useIntegration"
import NetworkSelectModel from "../components/select-model"
import NetworkSelectSource from "../components/select-source"
import NetworkSearchBar from "../components/header/search"
import NetworkParameters from "../components/parameters"
import { useIntl } from "react-intl"

export default function NetworksLayout() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()
  const { showGraphOnly } = integrationOptions

  if (showGraphOnly === true) return <NetworkCard />

  return (
    <Container fluid>
      <NetworksHeader />
      <PublicationFilters />
      <Container>
        <Row gutters>
          <Col xs="12" sm="12" lg="8">
            <NetworkCard />
            <ClustersButton />
            <NetworkClusters />
          </Col>
          <Col lg="4">
            <NetworkSearchBar label={intl.formatMessage({ id: "networks.search-bar.label" })} />
            <NetworkSelectModel />
            <NetworkSelectSource />
            <NetworkFilters />
            <NetworkParameters />
            <hr />
            <NetworkExports />
            <hr />
            <NetworkAnalytics />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
