import { Container, Row, Col } from "@dataesr/dsfr-plus"
import NetworksHeader from "../components/header"
import NetworkCard from "../components/graph/card"
import ClustersButton from "../components/clusters/button"
import NetworkClusters from "../components/clusters"
import NetworkAnalytics from "../components/clusters/analytics"
import NetworkExports from "../components/exports"
import useIntegration from "../hooks/useIntegration"
import { useIntl } from "react-intl"
import useScreenSize from "../../../hooks/useScreenSize"
import NetworksOptionsBar from "../components/options-bar"
import NetworksOptionsModals from "../components/options-bar/modals"

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
      <NetworksOptionsBar />
      <NetworksOptionsModals />
      <Container>
        <Row gutters>
          <Col>
            <NetworkCard />
            <ClustersButton />
            {!isMobile && <NetworkClusters />}
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
