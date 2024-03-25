import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthorById } from "../../../../../api/authors/[id]";
import LinkCard from "../../../../../components/link-card";
import { useIntl } from "react-intl";

export default function Jury({ authors }) {
  const intl = useIntl();
  const queryClient = useQueryClient();
  if (!authors.length) return null;
  const directors = authors?.filter((author) => author.role === "directeurthese") || [];
  const president = authors?.filter((author) => author.role === "presidentjury")?.[0] || {};
  // const membres = authors?.filter((author) => author.role === "membrejury") || [];
  const rapporteurs = authors?.filter((author) => author.role === "rapporteur") || [];


  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["author", id],
      queryFn: () => getAuthorById(id),
    });
  }

  return (
    <Row gutters>
      <Col xs="12">
        <Row gutters>
          <Col key={president.fullName} xs="12" md="6">
            {president?.fullName && (<LinkCard
              prefetch={president.person ? () => prefetch(president.person) : undefined}
              type="author"
              icon="user-star-line"
            >
              <Text className="fr-text-mention--grey fr-mb-0" size="sm">
                <i>{intl.formatMessage({ id: `publications.section.jury.${president.role}` })}</i>
              </Text>
              {president.person ? (
                <Link className="fr-text--bold" href={`/authors/${president.person}`}>
                  {president.fullName}
                </Link>
              ) : (
                <Text bold className="fr-m-0">
                  {president.fullName}
                </Text>
              )}
            </LinkCard>)}
          </Col>
        </Row>
        <Row gutters>
          {directors.map((dir) => (
            <Col key={dir.fullName} xs="12" md="6">
              <LinkCard
                prefetch={dir.person ? () => prefetch(dir.person) : undefined}
                type="author"
                icon="user-heart-line"
              >
                <Text className="fr-text-mention--grey fr-mb-0" size="sm">
                  <i>{intl.formatMessage({ id: `publications.section.jury.${dir.role}` })}</i>
                </Text>
                {dir.person ? (
                  <Link className="fr-text--bold" href={`/authors/${dir.person}`}>
                    {dir.fullName}
                  </Link>
                ) : (
                  <Text bold className="fr-m-0">
                    {dir.fullName}
                  </Text>
                )}
              </LinkCard>
            </Col>
          ))}
        </Row>
        <Row gutters>
          {rapporteurs.map((rapporteur) => (
            <Col key={rapporteur.fullName} xs="12" md="6">
              <LinkCard
                prefetch={rapporteur.person ? () => prefetch(rapporteur.person) : undefined}
                type="author"
                icon="user-search-line"
              >
                <Text className="fr-text-mention--grey fr-mb-0" size="sm">
                  <i>{intl.formatMessage({ id: `publications.section.jury.${rapporteur.role}` })}</i>
                </Text>
                {rapporteur.person ? (
                  <Link className="fr-text--bold" href={`/authors/${rapporteur.person}`}>
                    {rapporteur.fullName}
                  </Link>
                ) : (
                  <Text bold className="fr-m-0">
                    {rapporteur.fullName}
                  </Text>
                )}
              </LinkCard>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}