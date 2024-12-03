import { Col, Row, Text } from "@dataesr/dsfr-plus"
import { TRENDS_VIEWS_LABELS } from "../../../config/views"
import TrendsViewButton from "../button"
import { useIntl } from "react-intl"

export default function TrendsViewHeader() {
  const intl = useIntl()

  return (
    <Row verticalAlign="middle">
      <Col lg="3">
        <Text className="fr-mb-0">{intl.formatMessage({ id: `trends.views.header.domains` })}</Text>
      </Col>
      {TRENDS_VIEWS_LABELS.map((label, index) => (
        <Col key={index} lg="3">
          <Row key={index} horizontalAlign="right">
            <TrendsViewButton key={index} label={label} />
          </Row>
        </Col>
      ))}
    </Row>
  )
}
