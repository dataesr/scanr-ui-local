import { useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import useAggregateData from "../../hooks/useAggregationData";
import { OrganizationAggregations } from "../../../../types/organization";
import { Row, Col } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getDonutOptions from "../../../../components/analytics-graph/graph-options/donut";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";

export default function OrganizationsAnalytics() {
  const intl = useIntl();
  const { data, isLoading, isError } = useAggregateData('analytics');
  const { search: { data: searchData } } = useSearchData();

  if (isError) return null;
  if (isLoading || !searchData?.length) return <AnalyticsSkeleton />

  const { byFundings, byLocalization, byKind } = data as OrganizationAggregations

  const kindOptions = getDonutOptions({ data: byKind });
  const fundingsOptions = getBarChartOptions({ data: byFundings, colors: ['var(--organizations-analytics)'] });
  const localizationOptions = getBarChartOptions({ data: byLocalization, colors: ['var(--organizations-analytics)'] });


  return (
    <Row>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "search.analytics.organizations.by-kind.title" })}
          description={intl.formatMessage({ id: "search.analytics.organizations.by-kind.description" })}
          options={kindOptions}
        />
      </Col>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "search.analytics.organizations.by-fundings.title" })}
          description={intl.formatMessage({ id: "search.analytics.organizations.by-fundings.description" })}
          options={fundingsOptions}
        />
      </Col>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "search.analytics.organizations.by-localization.title" })}
          description={intl.formatMessage({ id: "search.analytics.organizations.by-localization.description" })}
          options={localizationOptions}
        />
      </Col>
    </Row>
  )
}