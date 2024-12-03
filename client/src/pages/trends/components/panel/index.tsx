import { Badge, Button, Col, Container, Row, Text } from "@dataesr/dsfr-plus"
import { TRENDS_VIEWS_LABELS, trendsViewGetConfig, trendsViewFromLabel } from "../../config/views"
import usePublicationsTrends from "../../hooks/usePublicationsTrends"
import { useTrendsContext } from "../../context"
import { useIntl } from "react-intl"
import TrendsFocus from "../focus"
import { MAX_YEAR } from "../../config/years"
import { diffColor, slopeColor, slopeMessage } from "./_utils"

function TrendsViewItem({ item }) {
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

function TrendsViewButton({ label }) {
  const intl = useIntl()
  const { view, setView, setFocus } = useTrendsContext()
  const viewConfig = trendsViewGetConfig(view)
  const defaultView = trendsViewFromLabel(label)

  const isSelected = Boolean(label === viewConfig.label)
  const onButtonClick = () => {
    isSelected ? viewConfig?.nextView && setView(viewConfig.nextView) : setView(defaultView)
    setFocus("")
  }

  return (
    <Button
      id={label}
      icon={isSelected ? (viewConfig.order == "top" ? "arrow-up-line" : "arrow-down-line") : ""}
      iconPosition="right"
      variant={isSelected ? "tertiary" : "text"}
      onClick={onButtonClick}
    >
      {intl.formatMessage({ id: `trends.views.count.header.${label}` })}
    </Button>
  )
}

function TrendsView() {
  const intl = useIntl()
  const { view } = useTrendsContext()
  const { trends, isFetching } = usePublicationsTrends()

  if (!trends || isFetching) return null

  const data = trends?.[view]
  if (!data) return null

  return (
    <Container fluid>
      <Row verticalAlign="middle">
        <Col lg="3">
          <Text className="fr-mb-0">{intl.formatMessage({ id: "trends.views.count.header.domain" })}</Text>
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
