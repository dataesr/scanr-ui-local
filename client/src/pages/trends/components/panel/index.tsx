import { Badge, Button, Col, Container, Row, Text } from "@dataesr/dsfr-plus"
import { TRENDS_VIEWS_LABELS, trendsViewGetConfig, trendsViewFromLabel } from "../../config/views"
import usePublicationsTrends from "../../hooks/usePublicationsTrends"
import { useTrendsContext } from "../../context"
import { useIntl } from "react-intl"
import TrendsFocus from "../focus"

const diffColor = (diff: number) => (diff > 0.15 ? "success" : diff < -0.15 ? "warning" : "beige-gris-galet")
const slopeColor = (slope: number) => (slope > 0.00005 ? "success" : slope < -0.00005 ? "warning" : "beige-gris-galet")
const slopeMessage = (slope: number) => (slope > 0.00005 ? "trending" : slope < -0.00005 ? "fading" : "stable")

function TrendsViewItem({ domain }) {
  const { focus, setFocus } = useTrendsContext()
  const isFocused = Boolean(focus === domain.label)

  return (
    <Row key={domain.label} verticalAlign="middle">
      <Col lg="3">
        <Button
          key={domain.label}
          variant={isFocused ? "tertiary" : "text"}
          onClick={() => setFocus(isFocused ? "" : domain.label)}
        >
          {domain.label}
        </Button>
      </Col>
      <Col lg="3">
        <div>{domain?.count?.["2023"] || 0}</div>
      </Col>
      <Col lg="3">
        <Badge noIcon color={diffColor(domain.diff)}>
          {`${Number(domain.diff * 100).toFixed(0.1)} %`}
        </Badge>
      </Col>
      <Col lg="3">
        <Badge noIcon key={domain.label} color={slopeColor(domain.slope)}>
          {slopeMessage(domain.slope)}
        </Badge>
      </Col>
    </Row>
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
            <TrendsViewButton label={label} />
          </Col>
        ))}
      </Row>
      {data.map((domain) => (
        <TrendsViewItem domain={domain} />
      ))}
    </Container>
  )
}

export default function TrendsPanel() {
  return (
    <Container fluid>
      <Container fluid className="fr-mt-2w">
        <TrendsView />
      </Container>
      <TrendsFocus />
    </Container>
  )
}
