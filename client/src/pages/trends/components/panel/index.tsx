import { Col, Container, Row, Text } from "@dataesr/dsfr-plus"
import { TRENDS_VIEWS_LABELS } from "../../config/views"
import useTrends from "../../hooks/useTrends"
import { useTrendsContext } from "../../context"
import { useIntl } from "react-intl"
import TrendsViewButton from "./button"
import TrendsViewItem from "./item"

function TrendsView() {
  const intl = useIntl()
  const { view } = useTrendsContext()
  const { trends, isFetching } = useTrends()

  if (!trends || isFetching) return null

  const data = trends?.[view]
  if (!data) return null

  return (
    <Container fluid>
      <Row verticalAlign="middle">
        <Col lg="3">
          <Text className="fr-mb-0">{intl.formatMessage({ id: "trends.views.header.domain" })}</Text>
        </Col>
        {TRENDS_VIEWS_LABELS.map((label) => (
          <Col lg="3">
            <Row horizontalAlign="right">
              <TrendsViewButton label={label} />
            </Row>
          </Col>
        ))}
      </Row>
      <hr />
      {data.map((item) => (
        <TrendsViewItem item={item} />
      ))}
    </Container>
  )
}

export default function TrendsPanel() {
  return (
    <Container fluid>
      <Container fluid className="fr-mt-2w fr-mr-2w">
        <TrendsView />
      </Container>
    </Container>
  )
}
