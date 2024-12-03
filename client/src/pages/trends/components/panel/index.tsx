import { Badge, Button, Col, Container, Row, Text } from "@dataesr/dsfr-plus"
import usePublicationsTrends from "../../hooks/usePublicationsTrends"
import { useTrendsContext } from "../../context"
import TrendsControlViews from "../control-tabs"
import { useIntl } from "react-intl"
import TrendsFocus from "../focus"

const diffColor = (diff: number) => (diff > 0.15 ? "success" : diff < -0.15 ? "warning" : "beige-gris-galet")
const slopeColor = (slope: number) => (slope > 0.00005 ? "success" : slope < -0.00005 ? "warning" : "beige-gris-galet")
const slopeMessage = (slope: number) => (slope > 0.00005 ? "trending" : slope < -0.00005 ? "fading" : "stable")

function CountItem({ domain }) {
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

function CountView({ data }) {
  const intl = useIntl()

  return (
    <Container fluid>
      <Row>
        <Col lg="3">
          <Text>{intl.formatMessage({ id: "trends.views.count.header.domain" })}</Text>
        </Col>
        <Col lg="3">
          <Text>{intl.formatMessage({ id: "trends.views.count.header.count" })}</Text>
        </Col>
        <Col lg="3">
          <Text>{intl.formatMessage({ id: "trends.views.count.header.diff" })}</Text>
        </Col>
        <Col lg="3">
          <Text>{intl.formatMessage({ id: "trends.views.count.header.trend" })}</Text>
        </Col>
      </Row>
      {data.map((domain) => (
        <CountItem domain={domain} />
      ))}
    </Container>
  )
}

function TrendItem({ domain, color }) {
  const { focus, setFocus } = useTrendsContext()
  const isFocused = Boolean(focus === domain.label)

  return (
    <Row key={domain.label} verticalAlign="middle">
      <Col lg="8">
        <Button
          key={domain.label}
          variant={isFocused ? "tertiary" : "text"}
          color={color}
          onClick={() => setFocus(isFocused ? "" : domain.label)}
        >
          {domain.label}
        </Button>
      </Col>
      <Col lg="4"></Col>
    </Row>
  )
}

function TrendView({ data }) {
  const intl = useIntl()

  return (
    <Container fluid>
      <Row>
        <Col lg="6">
          <Text>{intl.formatMessage({ id: "trends.views.trend.header.top" })}</Text>
        </Col>
        <Col lg="6">
          <Text>{intl.formatMessage({ id: "trends.views.trend.header.bot" })}</Text>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          {data.top.map((domain) => (
            <TrendItem domain={domain} color="success" />
          ))}
        </Col>
        <Col lg="6">
          {data.bot.map((domain) => (
            <TrendItem domain={domain} color="error" />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default function TrendsPanel() {
  const { view } = useTrendsContext()
  const { trends, isFetching } = usePublicationsTrends()

  if (!trends || isFetching) return null

  console.log("trends", trends)

  const { count: byCount, byDiff, bySlope } = trends

  return (
    <Container fluid>
      <TrendsControlViews />
      <Container fluid className="fr-mt-2w">
        {view === "count" && <CountView data={byCount} />}
        {view === "diff" && <TrendView data={byDiff} />}
        {view === "trend" && <TrendView data={bySlope} />}
      </Container>
      <TrendsFocus />
    </Container>
  )
}
