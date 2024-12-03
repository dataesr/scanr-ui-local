import { Badge, Button, Col, Container, Row } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../../context"
import { MAX_YEAR } from "../../../config/years"
import { itemGetColor, itemGetTrendState } from "../_utils"
import TrendsFocus from "../../focus"
import Wikidata from "../../wiki"

export default function TrendsViewItem({ item }) {
  const { model, focus, setFocus, normalized } = useTrendsContext()
  const isFocused = Boolean(focus === item.label)
  const diffColor = itemGetColor(item, "diff", normalized)
  const slopeColor = itemGetColor(item, normalized ? "norm_slope" : "slope", normalized)
  const trendState = itemGetTrendState(item, normalized)

  isFocused && console.log("item", item)

  return (
    <Container fluid>
      <Row key={item.label}>
        <Col lg="3">
          <Row verticalAlign="middle">
            <Button
              key={item.label}
              variant={isFocused ? "tertiary" : "text"}
              onClick={() => setFocus(isFocused ? "" : item.label)}
            >
              {item.label}
            </Button>
            {isFocused && model === "domains" && <Wikidata item={item} />}
          </Row>
        </Col>
        <Col lg="3">
          <Row horizontalAlign="right">
            <div>{item?.count?.[MAX_YEAR] || 0}</div>
          </Row>
        </Col>
        <Col lg="3">
          <Row horizontalAlign="right">
            <Badge noIcon key={`diff-${item.label}`} color={diffColor}>
              {`${Number(item.diff * 100).toFixed(0.1)} %`}
            </Badge>
          </Row>
        </Col>
        <Col lg="3">
          <Row horizontalAlign="right">
            <Badge noIcon key={`trend-${item.label}`} color={slopeColor}>
              {trendState}
            </Badge>
          </Row>
        </Col>
      </Row>
      {isFocused && <TrendsFocus item={item} />}
    </Container>
  )
}
