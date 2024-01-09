import { Accordion, Container } from "@dataesr/dsfr-plus";

import Histogram from "../../../../components/YearRangeSlider/histogram";

import BarLink from "../../../../components/bar-link";
import { FormattedMessage } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import { PublicationAggregations } from "../../../../api/types/publication";

export default function PublicationAnalytics() {
  const { search: { data: searchData }, analytics: { data = { byYear: [], byType: [], byFunder: [], byAuthors: [] }, isLoading } } = useSearchData();
  if (isLoading || !searchData?.length) return <AnalyticsSkeleton />
  const { byYear, byAuthors } = data as PublicationAggregations

  const _100TopAuthors = Math.max(...byAuthors.map((el) => el.count | 0));
  return (
    <>
      <Accordion defaultExpanded title={<FormattedMessage id="search.publications.analytics.by-year-accordion-name" />}>
        <Container fluid className="fr-m-2w histogram-filter">
          <Histogram data={byYear.map((year) => year.count)} />
        </Container>
      </Accordion>
      {/* <Accordion defaultExpanded title={<FormattedMessage id="search.publications.analytics.by-type-accordion-name" />}>
        <KeywordFacet value={currentFilters.find((el) => el.field === 'type')?.value || []} data={byType} onChange={(value) => setNextFilters((prev) => {
          if (!value.length) return prev.filter((el) => el.field !== "type");
          return [...prev.filter((el) => el.field !== "type"), { field: "type", value, type: "terms" }]
        })} />
      </Accordion>
      <Accordion defaultExpanded title={<FormattedMessage id="search.publications.analytics.by-project-accordion-name" />}>
        <KeywordFacet value={currentFilters.find((el) => el.field === 'projects.type')?.value || []} data={byFunder} onChange={(value) => setNextFilters((prev) => {
          if (!value.length) return prev.filter((el) => el.field !== "projects.type");
          return [...prev.filter((el) => el.field !== "projects.type"), { field: "projects.type", value, type: "terms" }]
        })} />
      </Accordion> */}
      <Accordion defaultExpanded title={<FormattedMessage id="search.publications.analytics.by-author-accordion-name" />}>
        {byAuthors?.slice(0, 10)?.map((coAuthor) => (
          <BarLink
            key={coAuthor.value}
            name={coAuthor.label}
            count={coAuthor.count}
            width={coAuthor.count * 100 / _100TopAuthors}
            href={`/authors/${coAuthor.value}`}
          />
        ))}
      </Accordion>
    </>
  )
}