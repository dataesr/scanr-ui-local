import { Col, Container, Row } from "@dataesr/dsfr-plus"
import useIntegration from "../../hooks/useIntegration"
import NetworksBreadcrumb from "./breadcrumb"
import NetworksSearchBar from "./search"
import NetworksSelect from "./select"

export default function NetworksHeader() {
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.useHeader === false) return null

  return (
    <Container className={"bg-network"} fluid>
      <Container className="fr-pt-4w">
        <NetworksBreadcrumb />
        <Row gutters className="fr-pb-4w fr-mb-2w">
          <Col xs="12" sm="8" lg="8">
            <NetworksSearchBar />
          </Col>
          <Col xs="12" sm="3" lg="3">
            <NetworksSelect />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
