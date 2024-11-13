import { Container, Row, Col } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../hooks/useScreenSize"
import PublicationFilters from "../../search/components/publications/filters"
import NetworksHeader from "../components/header"
import NetworkTitle from "../components/title"
import NetworkFilters from "../components/filters"
import NetworkCard from "../components/graph/card"
import ClustersButton from "../components/clusters/button"
import NetworkClusters from "../components/clusters"
import NetworkAnalytics from "../components/clusters/analytics"
import NetworkExports from "../components/exports"
import useIntegration from "../hooks/useIntegration"

export default function NetworksLayout() {
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const isScreenSmall = ["xs", "sm", "mg"].includes(screen)

  const { useFilters, useExports, useGraphOnly } = integrationOptions

  if (useGraphOnly === true) return <NetworkCard />

  return (
    <Container fluid>
      <NetworksHeader />
      <PublicationFilters />
      <Container>
        <NetworkTitle />
        <Row gutters>
          <Col xs="12" sm="12" lg="8">
            <NetworkCard />
          </Col>
          {!isScreenSmall && (
            <Col lg="4">
              <NetworkFilters />
              {useFilters && <hr />}
              <NetworkExports />
              {useExports && <hr />}
              <ClustersButton />
            </Col>
          )}
        </Row>
        {isScreenSmall && (
          <Row gutters>
            <Col xs="12" sm="8" lg="8">
              <ClustersButton />
            </Col>
            <Col xs="12" sm="4" lg="4">
              <NetworkExports />
            </Col>
          </Row>
        )}
        <Row gutters>
          <Col xs="12" sm="8" lg="8">
            <NetworkClusters />
          </Col>
          <Col xs="12" sm="4" lg="4">
            <NetworkAnalytics />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
