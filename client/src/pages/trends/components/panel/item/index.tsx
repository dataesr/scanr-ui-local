import { Badge, Col, Container, Row } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../../context"
import { MAX_YEAR } from "../../../config/years"
import { itemGetColor, itemGetTrendState } from "../_utils"
import TrendsFocus from "../../focus"

export default function TrendsViewItem({ item }) {
  const { view, focus, setFocus, normalized } = useTrendsContext()

  const diffColor = itemGetColor(item, "diff", normalized)
  const slopeColor = itemGetColor(item, normalized ? "norm_slope" : "slope", normalized)
  const trendState = itemGetTrendState(item, normalized)

  const isFocused = Boolean(focus === item.id)
  const focusKey = `focus-${view}-${item.id}`

  return (
    <Container key={view} fluid className="fr-accordion">
      <button
        className="fr-accordion__btn"
        aria-expanded="false"
        aria-controls={focusKey}
        onClick={() => setFocus(isFocused ? "" : item.id)}
      >
        <Row style={{ width: "100%" }} verticalAlign="middle">
          <Col lg="4">
            <Row horizontalAlign="center">
              <div>{item.label}</div>
            </Row>
          </Col>
          <Col lg="2">
            <Row horizontalAlign="right">
              <div>{item?.count?.[MAX_YEAR] || 0}</div>
            </Row>
          </Col>
          <Col lg="3">
            <Row horizontalAlign="right">
              <Badge noIcon color={diffColor}>
                {`${Number(item.diff * 100).toFixed(0.1)} %`}
              </Badge>
            </Row>
          </Col>
          <Col lg="3">
            <Row horizontalAlign="right">
              <Badge noIcon color={slopeColor}>
                {trendState}
              </Badge>
            </Row>
          </Col>
        </Row>
      </button>
      <div key={view} className="fr-collapse" id={focusKey}>
        {isFocused && <TrendsFocus item={item} />}
      </div>
    </Container>
  )
}
