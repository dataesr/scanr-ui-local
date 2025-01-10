import { Col, Container, Row } from "@dataesr/dsfr-plus"
import ClustersButton from "./button"
import ContributeButton from "../contribute/button"
import NetworkClustersItems from "./items"
import NetworkAnalytics from "./analytics"
import useIntegration from "../../hooks/useIntegration"

export default function NetworkClusters() {
  const { integrationId, integrationOptions } = useIntegration()
  return (
    <Container fluid>
      {!integrationId ? (
        <Container fluid style={{ display: "flex", justifyContent: "space-between" }}>
          <ClustersButton />
          <ContributeButton />
        </Container>
      ) : (
        <ClustersButton />
      )}

      {integrationOptions.showClustersAnalytics ? (
        <Row gutters>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <NetworkClustersItems />
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <NetworkAnalytics />
          </Col>
        </Row>
      ) : (
        <NetworkClustersItems />
      )}
    </Container>
  )
}
