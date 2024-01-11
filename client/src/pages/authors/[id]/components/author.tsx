import { Badge, BadgeGroup, Col, Container, Row, Text, Title, Tab, Tabs } from "@dataesr/dsfr-plus";
import CopyBadgeButton from "../../../../components/copy/copy-badge-button";
import Share from "../../../../components/share";
import OaDonut from "../../../../components/oa-donut";
import BarLink from "../../../../components/bar-link";
import { PageContent, PageSection } from "../../../../components/page-content";
import useScreenSize from "../../../../hooks/useScreenSize";
import PublicationItem from "../../../search/components/publications/publication-item";
import TagCloud from "../../../../components/tag-cloud";
import Histogram from "../../../../components/YearRangeSlider/histogram";
import { useSearchParams } from "react-router-dom";


type Author = {
  id: string;
  fullName: string;
  externalIds: {
    id: string;
    type: string;
  }[];
  wikis: {
    value: string;
    label: string;
  }[];
  awards: {
    label: string;
  }[];
  coAuthors: {
    value: string;
    label: string;
    count: number;
  }[];
}


function getOaInfo(publications) {
  const oaCount = publications?.filter((publi) => publi.isOa)?.length;
  const oaTotal = publications?.length;
  return { oaPercent: Math.ceil(oaCount / oaTotal * 100), oaCount, oaTotal };
}

export default function Author({ data }) {
  const { screen } = useScreenSize();
  const isMobile = ["xs", "sm"].includes(screen);
  const maxCommonPublications = data.coAuthors && Math.max(...data.coAuthors.map((el) => el.count));
  const maxReviews = data.reviews && Math.max(...data.reviews.map((el) => el.count));
  const thesis = data?.publications?.filter((publi) => {
    return (publi.type === 'these') && publi.authors.find((author) => author.person === data.id)?.role === 'author';
  })?.[0];
  const thesisParticipations = data?.publications?.filter((publi) => {
    return (publi.type === 'these') && publi.authors.find((author) => author.person === data.id)?.role !== 'author';
  });
  const publications = data?.publications?.filter((publi) => publi.type !== 'these');

  const { oaPercent } = getOaInfo(publications);

  const awards = data?.awards?.map((award) => award.label) || [];


  // Example For victor
  const tabs = ["publications", "thesis", "thesisParticipations"];
  const [searchParams, setSearchParams] = useSearchParams();
  const urltab = searchParams.get("tab") || "thesis";



  return (
    <Container fluid>
      <Row gutters>
        <Col xs="12" lg="8">
          <Row gutters>
            <Col xs="12">
              <BadgeGroup>
                <Badge variant="info" noIcon>Auteur</Badge>
              </BadgeGroup>
              <Title className="fr-mb-1v" as="h1" look="h4">{data?.fullName}</Title>
              {awards.map((award, i) => (
                <div key={i} style={{ display: "flex" }}>
                  <span className="fr-mr-1v fr-icon-award-fill" />
                  <Text className="fr-mb-0" as="span" size="sm">{award}</Text>
                </div>
              ))}
            </Col>
            {!isMobile && (<Col xs="12">
              <Text bold className="fr-mb-1v">
                Concepts wikidata
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour rechercher d'autres publications contenant le mot-clé
              </Text>
              <TagCloud data={data.wikis} order="random" />
            </Col>)}
            {!isMobile ? (<Col className="fr-mt-5w" xs="12">
              {/* Example for victor */}
              <Tabs defaultActiveIndex={tabs.indexOf(urltab)} onTabChange={(i) => setSearchParams({ tab: tabs[i] })}>
                {(publications.length > 0) ? (
                  <Tab className="authors-publications-tabs" label={`Publications (${publications.length || 0})`}>
                    <div className="result-list">
                      {publications?.map((publi) => (
                        <PublicationItem data={publi} key={publi.id} />
                      ))}
                    </div>
                  </Tab>) : null}
                {thesis && <Tab className="authors-publications-tabs" label="Thèse de l'auteur" icon="link">
                  <div className="result-list">
                    <PublicationItem data={thesis} />
                  </div>
                </Tab>}
                {(thesisParticipations.length > 0) ? (
                  <Tab className="authors-publications-tabs" label={`Participations à des jury de thèse (${thesisParticipations.length || 0})`}>
                    <div className="result-list">
                      {thesisParticipations?.map((publi) => (
                        <PublicationItem data={publi} key={publi.id} />
                      ))}
                    </div>
                  </Tab>) : null}
              </Tabs>
            </Col>) : null}
          </Row>
        </Col>
        <PageContent>
          {(isMobile && thesis) && (
            <PageSection show title="Thèse de l'auteur">
              <div className="result-list">
                <PublicationItem data={thesis} />
              </div>
            </PageSection>
          )}
          {(isMobile && publications.length) && (
            <PageSection show title={`Liste des publications (${publications.length || 0})`}>
              <div className="result-list">
                {publications?.map((publi) => (
                  <PublicationItem data={publi} key={publi.id} />
                ))}
              </div>
            </PageSection>
          )}
          {(isMobile && thesisParticipations.length) ? (
            <PageSection show title={`Participations à des jury de thèse (${thesisParticipations.length || 0})`}>
              <div className="result-list">
                {thesisParticipations?.map((publi) => (
                  <PublicationItem data={publi} key={publi.id} />
                ))}
              </div>
            </PageSection>
          ) : null}
          <PageSection show title="Identifiants de l'auteur" description="Cliquez pour copier l'identifiant dans le press-papier">
            <div className="fr-badge-group">
              {data.externalIds
                ?.filter((ext) => ext?.type !== 'scanr')
                .map((ext, i) => <CopyBadgeButton key={i} lowercase size="sm" text={ext.id} />)
              }
            </div>
          </PageSection>
          <PageSection show title={"Publications par année"} description="Nombre de publication par an depuis 2013">
            <Histogram data={data.byYear.map((year) => year.count)} />
          </PageSection>
          {isMobile && (
            <PageSection show title={"Publications par année"} description="Nombre de publication par an depuis 2013">
              <TagCloud data={data.wikis} order="random" />
            </PageSection>
          )}
          <PageSection show title={`Publications en accès ouvert ${oaPercent}%`} description="Calculé">
            <OaDonut percent={oaPercent} />
          </PageSection>

          <PageSection show title="Principaux co-auteurs" description="Cliquez pour accèder la page du co-auteur">
            {data.coAuthors?.slice(0, 6)?.map((coAuthor, i) => (
              <BarLink
                key={i}
                name={coAuthor.label}
                count={coAuthor.count}
                width={coAuthor.count * 100 / maxCommonPublications}
                href={`/authors/${coAuthor.value}`}
              />
            ))}
          </PageSection>
          <PageSection show title="Principales revues" description="Cliquez pour rechercher des publications de la revue">
            {data.reviews?.slice(0, 6)?.map((review, i) => (
              <BarLink
                key={i}
                name={review.sourceTitle}
                count={review.count}
                width={review.count * 100 / maxReviews}
                href={`/authors/${review.sourceTitle}`}
              />
            ))}
          </PageSection>
        </PageContent>
        <Col xs="12">
          <hr />
          <Share />
        </Col>
      </Row>
    </Container>
  )
}