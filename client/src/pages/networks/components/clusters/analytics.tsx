import { Container, Row, Col, Accordion } from "@dataesr/dsfr-plus"
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton"
import { useIntl } from "react-intl"
import useTab from "../../hooks/useTab"
import AnalyticsGraph from "../../../../components/analytics-graph"
import useSearchData from "../../hooks/useSearchData"
import getHorizontalBarChartOptions from "../charts/hbar"
import getYearsChartOptions from "../charts/years"
import useScreenSize from "../../../../hooks/useScreenSize"
import useParameters from "../../hooks/useParameters"

export default function NetworkAnalytics() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentTab } = useTab()
  const { parameters } = useParameters()
  const { search, currentQuery } = useSearchData(currentTab)
  const clusters = search.data?.network?.clusters

  if (Boolean(search.error) || !currentQuery || !parameters.clusters) return null

  if (parameters.clusters && search.isFetching)
    return (
      <Container className="fr-mt-2w">
        <AnalyticsSkeleton />
      </Container>
    )

  const chartData = clusters.slice(0, 10)
  const sizeChartOptions = getHorizontalBarChartOptions({ data: chartData, x: "label", y: "size" })
  const publicationsChartOptions = getHorizontalBarChartOptions({
    data: chartData,
    x: "label",
    y: "publicationsCount",
    name: "Publications",
  })
  // const oaChartOptions = getHorizontalBarChartOptions({
  //   data: chartData,
  //   x: "label",
  //   y: "oaPercent",
  //   name: "Open Acces",
  //   unit: "%",
  // })
  const yearsChartOptions = getYearsChartOptions({
    data: chartData,
    years: "publicationsByYear",
  })

  const citationsChartOptions = getYearsChartOptions({
    data: chartData,
    years: "citationsByYear",
  })

  const AnalyticsGraphs = () => (
    <Row className="fr-mt-2w">
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage(
            { id: "networks.analytics.clusters.size.title" },
            { tab: intl.formatMessage({ id: `networks.tab.of.${currentTab}` }) }
          )}
          description={intl.formatMessage(
            { id: "networks.analytics.clusters.size.description" },
            { tab: intl.formatMessage({ id: `networks.tab.of.${currentTab}` }) }
          )}
          options={sizeChartOptions}
        />
      </Col>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "networks.analytics.clusters.publications.title" })}
          description={intl.formatMessage({ id: "networks.analytics.clusters.publications.description" })}
          options={publicationsChartOptions}
        />
      </Col>
      {/* <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "networks.analytics.clusters.oa.title" })}
          description={intl.formatMessage({ id: "networks.analytics.clusters.oa.description" })}
          options={oaChartOptions}
        />
      </Col> */}
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "networks.analytics.clusters.years.title" })}
          description={intl.formatMessage({ id: "networks.analytics.clusters.years.description" })}
          options={yearsChartOptions}
        />
      </Col>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "networks.analytics.clusters.citations.title" })}
          description={intl.formatMessage({ id: "networks.analytics.clusters.citations.description" })}
          options={citationsChartOptions}
        />
      </Col>
    </Row>
  )

  if (["xs", "sm"].includes(screen)) {
    return (
      <Accordion title={intl.formatMessage({ id: "networks.analytics.clusters.title" })}>
        <AnalyticsGraphs />
      </Accordion>
    )
  }

  return <AnalyticsGraphs />
}
