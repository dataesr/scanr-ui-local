import { Badge, Button, Col, Container, Row } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../../context"
import { MAX_YEAR } from "../../../config/years"
import { diffColor, slopeColor, slopeMessage } from "../_utils"
import TrendsFocus from "../../focus"

export default function TrendsViewItem({ item }) {
  const { focus, setFocus } = useTrendsContext()
  const isFocused = Boolean(focus === item.label)

  return (
    <Container fluid>
      <Row key={item.label}>
        <Col lg="3">
          <Button
            key={item.label}
            variant={isFocused ? "tertiary" : "text"}
            onClick={() => setFocus(isFocused ? "" : item.label)}
          >
            {item.label}
          </Button>
        </Col>
        <Col lg="3">
          <Row horizontalAlign="right">
            <div>{item?.count?.[MAX_YEAR] || 0}</div>
          </Row>
        </Col>
        <Col lg="3">
          <Row horizontalAlign="right">
            <Badge noIcon color={diffColor(item.diff)}>
              {`${Number(item.diff * 100).toFixed(0.1)} %`}
            </Badge>
          </Row>
        </Col>
        <Col lg="3">
          <Row horizontalAlign="right">
            <Badge noIcon key={item.label} color={slopeColor(item.slope)}>
              {slopeMessage(item.slope)}
            </Badge>
          </Row>
        </Col>
      </Row>
      {isFocused && <TrendsFocus />}
    </Container>
  )
}
