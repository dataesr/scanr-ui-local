import { Container, Row, Col } from "@dataesr/dsfr-plus"
import NetworksHeader from "../components/header"
import NetworkCard from "../components/graph/card"
import ClustersButton from "../components/clusters/button"
import NetworkClusters from "../components/clusters"
import NetworkAnalytics from "../components/clusters/analytics"
import useIntegration from "../hooks/useIntegration"
import useScreenSize from "../../../hooks/useScreenSize"
import NetworksOptionsBar from "../components/options-bar"
import NetworksOptionsModals from "../components/options-bar/modals"

export default function NetworksLayout() {
  const { integrationOptions } = useIntegration()
  const { showGraphOnly } = integrationOptions
  const { screen } = useScreenSize()

  if (showGraphOnly === true) return <NetworkCard />

  console.log("screen", screen)

  return (
    <Container fluid>
      <NetworksHeader />
      <NetworksOptionsBar />
      <NetworksOptionsModals />
      <Container>
        <NetworkCard />
        <Row horizontalAlign="center">
          <ClustersButton />
        </Row>
        <Row gutters>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <NetworkClusters />
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <NetworkAnalytics />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
