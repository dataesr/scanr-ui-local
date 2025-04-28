import { useDSFRConfig, Link, Text, Row, Col } from "@dataesr/dsfr-plus";
import { RecentAffiliation } from "../../../../../types/author";
import getLangFieldValue from "../../../../../utils/lang";
import { getOrganizationById } from "../../../../../api/organizations/[id]";
import { useQueryClient } from "@tanstack/react-query";
import LinkCard from "../../../../../components/link-card";
import { useIntl } from "react-intl";

function getSearchFilterUrl({ id, label, minYear, maxYear, authorId, authorName }) {
  const searchFilter = {
    'affiliations.id': { values: [{ value: id, label: label?.fr }], type: 'terms' },
    'authors.person': { values: [{ value: authorId, label: authorName }], type: 'terms' },
    'year': { values: [{ value: minYear, label: minYear.toString() }, { value: maxYear, label: maxYear.toString() }], type: 'range' },
  };
  return `/search/publications?filters=${encodeURIComponent(JSON.stringify(searchFilter))}`;
}

export default function RecentAffiliations({
  data,
  authorId,
  authorName,
}: {
  data: RecentAffiliation[];
  authorId: string;
  authorName: string;
}) {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { locale } = useDSFRConfig();

  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["organization", id],
      queryFn: () => getOrganizationById(id),
    });
  }

  const recents = data
    ?.reduce((acc, { structure, sources }) => {
      const years =
        sources
          ?.map((source) => source.year)
          .filter(Boolean)
          .map((year) => parseInt(year, 10)) || [];
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      acc.push({
        id: structure.id,
        label: structure.label,
        city: structure.mainAddress?.city,
        publicationCount: sources.length,
        minYear,
        maxYear,
      });

      return acc;
    }, [])
    .sort((a, b) => b.maxYear - a.maxYear);

  return (
    <Row gutters>
      {recents?.map(
        ({ id, label, city, publicationCount, minYear, maxYear }) => (
          <Col key={id} xs="12">
            <LinkCard
              prefetch={() => prefetch(id)}
              type="organization"
              icon="building-line"
            >
              {city && (
                <Text className="fr-text-mention--grey fr-mb-0" size="sm">
                  <em>{city}</em>
                </Text>
              )}
              <Link className="fr-text--bold" href={`/organizations/${id}`}>
                {getLangFieldValue(locale)(label)}
              </Link>
              <div>
                {publicationCount && (
                  <>
                    <Link className="fr-link fr-link--sm searchlink" href={getSearchFilterUrl({ id, label, minYear, maxYear, authorId, authorName })}>
                      {intl.formatMessage(
                        {
                          id: "authors.section.recent-affiliations.publication-count",
                        },
                        { count: publicationCount }
                      )}
                    </Link>
                    {" "}
                    <span className="fr-text-mention--grey">{minYear !== maxYear
                      ? intl.formatMessage(
                        { id: "authors.section.recent-affiliations.between" },
                        { min: minYear, max: maxYear }
                      )
                      : minYear}
                    </span>
                  </>
                )}
              </div>
            </LinkCard>
          </Col>
        )
      )}
    </Row>
  );
}
