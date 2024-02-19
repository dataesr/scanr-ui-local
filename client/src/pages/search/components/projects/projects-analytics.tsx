import { useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import useAggregateData from "../../hooks/useAggregationData";
import { Row, Col } from "@dataesr/dsfr-plus";
import { ProjectAggregations } from "../../../../types/project";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";

export default function ProjectsAnalytics() {
  const intl = useIntl();
  const { data, isLoading, isError } = useAggregateData('analytics');
  const { search: { data: searchData } } = useSearchData();

  if (isError) return null;
  if (isLoading || !searchData?.length) return <AnalyticsSkeleton />

  const { byType, byYear } = data as ProjectAggregations

  const typeOptions = getBarChartOptions({ data: byType, colors: ['var(--background-contrast-green-emeraude)'] });
  const yearsOptions = getYearChartOptions({ data: byYear, colors: ['var(--background-contrast-green-emeraude)'] });

  return (
    <Row>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "search.analytics.projects.by-year.title" })}
          description={intl.formatMessage({ id: "search.analytics.projects.by-year.description" })}
          options={yearsOptions}
        />
      </Col>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "search.analytics.projects.by-type.title" })}
          description={intl.formatMessage({ id: "search.analytics.projects.by-type.description" })}
          options={typeOptions}
        />
      </Col>
    </Row>
  )
}