import { Col, Row, Text } from "@dataesr/dsfr-plus"
import { TRENDS_VIEWS_LABELS } from "../../../config/views"
import TrendsViewButton from "../button"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../../context"

export default function TrendsViewHeader() {
  const intl = useIntl()
  const { model } = useTrendsContext()

  return (
    <Row verticalAlign="middle">
      <Col lg="3">
        <Text className="fr-mb-0">{intl.formatMessage({ id: `trends.views.header.${model}` })}</Text>
      </Col>
      {TRENDS_VIEWS_LABELS.map((label) => (
        <Col lg="3">
          <Row horizontalAlign="right">
            <TrendsViewButton label={label} />
          </Row>
        </Col>
      ))}
    </Row>
  )
}
