import { Col, Container, Row } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import TrendsSearchBarButton from "../search-bar/button"
import TrendsSelectModelButton from "../select-model/button"
import TrendsSelectSourceButton from "../select-source/button"
import TrendsFiltersButton from "../filters/button"
import TrendsParametersButton from "../parameters/button"

export default function TrendsOptionsBar() {
  const { screen } = useScreenSize()

  return (
    <Container className="fr-mb-2w">
      <Row>
        <Col xs={12} sm={9} md={8} lg={8} xl={8}>
          <Row horizontalAlign="left">
            <TrendsSearchBarButton />
            <TrendsSelectModelButton />
            <TrendsSelectSourceButton />
          </Row>
        </Col>
        <Col xs={12} sm={3} md={4} lg={4} xl={4}>
          <Row horizontalAlign={screen === "xs" ? "left" : "right"}>
            <TrendsFiltersButton />
            <TrendsParametersButton />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
