import { Col, Container, Row } from "@dataesr/dsfr-plus"
import usePublicationsTrends from "../hooks/usePublicationsTrends"
import TrendsHeader from "../components/header"
import TrendsPanel from "../components/panel"
import TrendsSelectModel from "../components/select-model"
import TrendsSelectSource from "../components/select-source"
import TrendsParameters from "../components/parameters"

export default function TrendsLayout() {
  const { trends } = usePublicationsTrends()

  if (!trends) return null

  return (
    <Container fluid>
      <TrendsHeader />
      <Container>
        <Row gutters>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <TrendsPanel data={trends} />
          </Col>
          <Col lg="4">
            <TrendsSelectModel />
            <TrendsSelectSource />
            <TrendsParameters />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
