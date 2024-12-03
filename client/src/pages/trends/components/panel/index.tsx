import { Badge, Button, Col, Container, Row, Text } from "@dataesr/dsfr-plus"
import usePublicationsTrends from "../../hooks/usePublicationsTrends"
import { useTrendsContext } from "../../context"
import TrendsControlViews from "./control-tabs"

const diffColor = (diff: number) => (diff > 0.15 ? "success" : diff < -0.15 ? "warning" : "beige-gris-galet")
const slopeColor = (slope: number) => (slope > 0.00005 ? "success" : slope < -0.00005 ? "warning" : "beige-gris-galet")
const slopeMessage = (slope: number) => (slope > 0.00005 ? "trending" : slope < -0.00005 ? "fading" : "stable")

function CountItem({ domain }) {
  return (
    <Row key={domain.label} verticalAlign="middle">
      <Col lg="3">
        <Button key={domain.label} variant="text">
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
  return (
    <Container fluid>
      <Row>
        <Col lg="3">
          <Text>Domain</Text>
        </Col>
        <Col lg="3">
          <Text>Publications (2023)</Text>
        </Col>
        <Col lg="3">
          <Text>Trend (1 year)</Text>
        </Col>
        <Col lg="3">
          <Text>Trend (5 years)</Text>
        </Col>
      </Row>
      {data.map((domain) => (
        <CountItem domain={domain} />
      ))}
    </Container>
  )
}

function TrendItem({ domain, color }) {
  return (
    <Row key={domain.label} verticalAlign="middle">
      <Col lg="8">
        <Button key={domain.label} variant="text" color={color}>
          {domain.label}
        </Button>
      </Col>
      <Col lg="4"></Col>
    </Row>
  )
}

function TrendView({ data }) {
  return (
    <Container fluid>
      <Row>
        <Col lg="6">
          <Text>Top trending</Text>
        </Col>
        <Col lg="6">
          <Text>Top fading</Text>
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

  const { byCount, byDiff, bySlope } = trends

  return (
    <Container fluid>
      <TrendsControlViews />
      <Container fluid className="fr-mt-2w">
        {view === "count" && <CountView data={byCount} />}
        {view === "diff" && <TrendView data={byDiff} />}
        {view === "trend" && <TrendView data={bySlope} />}
      </Container>
    </Container>
  )
}
