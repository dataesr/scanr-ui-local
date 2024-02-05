import BarLink from "../../../../components/bar-link";
import { useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import { PublicationAggregations } from "../../../../types/publication";
import YearBars from "../../../../components/year-bars";
import { PageContent, PageSection } from "../../../../components/page-content";
import useAggregateData from "../../hooks/useAggregationData";

export default function PublicationAnalytics() {
  const intl = useIntl();
  const { data, isLoading, isError } = useAggregateData('analytics');
  const { search: { data: searchData } } = useSearchData();
  if (isError) return null;
  if (isLoading || !searchData?.length) return <AnalyticsSkeleton />

  const { byYear, byAuthors } = data as PublicationAggregations

  const _100TopAuthors = Math.max(...byAuthors.map((el) => el.count | 0));
  return (
    <PageContent>
      <PageSection size='lg' show title={intl.formatMessage({ id: "search.publications.analytics.by-year.title" })} >
        <YearBars
          height="250px"
          name={intl.formatMessage({ id: "search.publications.analytics.by-year.year-bars.name" })}
          counts={byYear.map((year) => year.count)}
          years={byYear.map((year) => year.value)}
        />
      </PageSection>
      <PageSection size='lg' show title={intl.formatMessage({ id: "search.publications.analytics.by-author.title" })}>
        {byAuthors?.slice(0, 10)?.map((coAuthor) => (
          <BarLink
            key={coAuthor.value}
            name={coAuthor.label}
            count={coAuthor.count}
            width={coAuthor.count * 100 / _100TopAuthors}
            href={`/authors/${coAuthor.value}`}
          />
        ))}
      </PageSection>
    </PageContent >
  )
}