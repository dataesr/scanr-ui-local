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
import NetworkSearchBar from "../components/search-bar"
import NetworkParameters from "../components/parameters"
import { useIntl } from "react-intl"
import useScreenSize from "../../../hooks/useScreenSize"

export default function NetworksLayout() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()
  const { showGraphOnly } = integrationOptions
  const { screen } = useScreenSize()
  const isMobile = ["xs", "sm"].includes(screen)

  if (showGraphOnly === true) return <NetworkCard />

  return (
    <Container fluid>
      <NetworksHeader />
      <PublicationFilters />
      <Container>
        <Row gutters>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <NetworkCard />
            <ClustersButton />
            {!isMobile && <NetworkClusters />}
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
            {isMobile && <NetworkClusters />}
            <NetworkAnalytics />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
