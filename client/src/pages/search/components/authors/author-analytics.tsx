import { useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import useAggregateData from "../../hooks/useAggregationData";
import { Row, Col } from "@dataesr/dsfr-plus";
import { AuthorsAggregations } from "../../../../types/author";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";

export default function AuthorAnalytics() {
  const intl = useIntl();
  const { data, isLoading, isError } = useAggregateData('analytics');
  const { search: { data: searchData } } = useSearchData();

  if (isError) return null;
  if (isLoading || !searchData?.length) return <AnalyticsSkeleton />

  const { byAward } = data as AuthorsAggregations

  const AwardsOptions = getBarChartOptions({ data: byAward.slice(0, 10), colors: ['var(--background-contrast-orange-terre-battue)'] });

  return (
    <Row>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({ id: "search.analytics.authors.by-award.title" })}
          description={intl.formatMessage({ id: "search.analytics.authors.by-award.description" })}
          options={AwardsOptions}
        />
      </Col>
    </Row>
  )
}