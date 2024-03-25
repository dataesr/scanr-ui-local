import { Row, Col } from "@dataesr/dsfr-plus"
import AnalyticsSkeleton from "../../../components/skeleton/analytics-skeleton"
import { useIntl } from "react-intl"
import useTab from "../hooks/useTab"
import AnalyticsGraph from "../../../components/analytics-graph"
import useSearchData from "../hooks/useSearchData"
import getSizeChartOptions from "./charts/size"
import getOaChartOptions from "./charts/oa"
import getYearsChartOptions from "./charts/years"

export default function ClustersAnalytics({ clustersTabs, show }: { clustersTabs: any; show: boolean }) {
  const intl = useIntl()
  const { currentTab } = useTab()
  const enableClusters = show ? clustersTabs[currentTab] : false
  const { search, currentQuery } = useSearchData(currentTab, enableClusters)
  const clusters = search.data?.network?.clusters

  if (!show || Boolean(search.error) || !currentQuery || !enableClusters) return null

  if (enableClusters && search.isFetching) return <AnalyticsSkeleton />

  const sizeChartOptions = getSizeChartOptions({ data: clusters.slice(0, 10) })
  const oaChartOptions = getOaChartOptions({ data: clusters.slice(0, 10) })
  const yearsChartOptions = getYearsChartOptions({ data: clusters.slice(0, 10) })
  console.log(yearsChartOptions)

  return (
    <Row>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "networks.analytics.clusters.size.title" })}
          description={intl.formatMessage({ id: "networks.analytics.clusters.size.description" })}
          options={sizeChartOptions}
        />
      </Col>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "networks.analytics.clusters.oa.title" })}
          description={intl.formatMessage({ id: "networks.analytics.clusters.oa.description" })}
          options={oaChartOptions}
        />
      </Col>
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
