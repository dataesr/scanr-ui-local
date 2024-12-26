import { Col, Container, Row } from "@dataesr/dsfr-plus"
import NetworkExportsButton from "../exports/button"
import NetworkSearchBarButton from "../search-bar/button"
import NetworkSelectModelButton from "../select-model/button"
import NetworkSelectSourceButton from "../select-source/button"
import NetworkFiltersButton from "../filters/button"
import NetworkParametersButton from "../parameters/button"
import useScreenSize from "../../../../hooks/useScreenSize"
import useIntegration from "../../hooks/useIntegration"

export default function NetworksOptionsBar() {
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()

  if (integrationOptions.showOptionsBar === false) return null

  return (
    <Container className="fr-mb-2w">
      <Row>
        <Col xs={12} sm={12} md={9} lg={7} xl={7}>
          <Row horizontalAlign="left">
            <NetworkSearchBarButton />
            <NetworkSelectModelButton />
            <NetworkSelectSourceButton />
          </Row>
        </Col>
        <Col xs={12} sm={12} md={3} lg={5} xl={5}>
          <Row horizontalAlign={["xs", "sm"].includes(screen) ? "left" : "right"}>
            <NetworkFiltersButton />
            <NetworkParametersButton />
            <NetworkExportsButton />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
