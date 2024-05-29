import { Container, Row, Col } from "@dataesr/dsfr-plus"
import AnalyticsSkeleton from "../../../components/skeleton/analytics-skeleton"
import { useIntl } from "react-intl"
import useTab from "../hooks/useTab"
import AnalyticsGraph from "../../../components/analytics-graph"
import useSearchData from "../hooks/useSearchData"
import getHorizontalBarChartOptions from "./charts/hbar"
import getYearsChartOptions from "./charts/years"

export default function ClustersAnalytics({ clustersTabs, show }: { clustersTabs: any; show: boolean }) {
  const intl = useIntl()
  const { currentTab } = useTab()
  const enableClusters = show ? clustersTabs[currentTab] : false
  const { search, currentQuery } = useSearchData(currentTab, enableClusters)
  const clusters = search.data?.network?.clusters

  if (!show || Boolean(search.error) || !currentQuery || !enableClusters) return null

  if (enableClusters && search.isFetching)
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
    y: "hits",
    name: "Publications",
  })
  // const oaChartOptions = getHorizontalBarChartOptions({
  //   data: chartData,
  //   x: "label",
  //   y: "oaPercent",
  //   name: "Open Acces",
  //   unit: "%",
  // })
  const yearsChartOptions = getYearsChartOptions({ data: clusters.slice(0, 10) })

  return (
    <Row className="fr-mt-2w">
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: `networks.analytics.clusters.size.title.${currentTab}` })}
          description={intl.formatMessage({ id: "networks.analytics.clusters.size.description" })}
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
    </Row>
  )
}
