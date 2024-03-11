import { useDSFRConfig, Link, Text, Row, Col } from "@dataesr/dsfr-plus";
import { RecentAffiliation } from "../../../../../types/author";
import getLangFieldValue from "../../../../../utils/lang";
import { getOrganizationById } from "../../../../../api/organizations/[id]";
import { useQueryClient } from "@tanstack/react-query";
import LinkCard from "../../../../../components/link-card";
import { useIntl } from "react-intl";

export default function RecentAffiliations({ data }: { data: RecentAffiliation[] }) {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { locale } = useDSFRConfig();


  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ['organization', id],
      queryFn: () => getOrganizationById(id),
    })
  }

  const recents = data?.reduce((acc, { structure, sources }) => {
    const years = sources?.map(source => source.year).filter(Boolean).map(year => parseInt(year, 10)) || [];
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    acc.push({
      id: structure.id,
      label: structure.label,
      city: structure.mainAddress.city,
      publicationCount: sources.length,
      minYear,
      maxYear,

    });

    return acc;
  }, []).sort((a, b) => b.maxYear - a.maxYear);

  return (
    <Row gutters>
      {recents?.map(({ id, label, city, publicationCount, minYear, maxYear }) => (
        <Col key={id} xs="12">
          <LinkCard prefetch={() => prefetch(id)} type="organization" icon="building-line">
            {city && (
              <Text className="fr-text-mention--grey fr-mb-0" size="sm">
                <em>
                  {city}
                </em>
              </Text>
            )}
            <Link className="fr-text--bold" href={`/organizations/${id}`}>
              {getLangFieldValue(locale)(label)}
            </Link>
            {publicationCount && <Text className="fr-text-mention--grey fr-mb-0" size="sm">
              {intl.formatMessage({ id: "authors.section.recent-affiliations.publication-count" }, { count: publicationCount })}
              {' '}
              {(minYear !== maxYear)
                ? intl.formatMessage({ id: "authors.section.recent-affiliations.between" }, { min: minYear, max: maxYear })
                : minYear
              }
            </Text>}
          </LinkCard>
        </Col>
      ))}
    </Row>
  )
}