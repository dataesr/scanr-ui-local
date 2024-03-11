// import BarLink from "../../../../components/bar-link";
import { useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import useAggregateData from "../../hooks/useAggregationData";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";
import { Row, Col } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import { PatentAggregations } from "../../../../types/patent";

export default function PatentAnalytics() {
  const intl = useIntl();
  const { data, isLoading, isError } = useAggregateData("analytics");
  const {
    search: { data: searchData },
  } = useSearchData();
  if (isError) return null;
  if (isLoading || !searchData?.length) return <AnalyticsSkeleton />;

  const { byYear } = data as PatentAggregations;

  const yearOptions = getYearChartOptions({
    data: byYear,
    colors: ["var(--artwork-minor-purple-glycine)"],
  });

  return (
    <Row>
      <Col xs="12">
        <AnalyticsGraph
          title={intl.formatMessage({
            id: "search.analytics.patent.by-year.title",
          })}
          description={intl.formatMessage({
            id: "search.analytics.publications.by-year.description",
          })}
          options={yearOptions}
        />
      </Col>
    </Row>
  );
}
