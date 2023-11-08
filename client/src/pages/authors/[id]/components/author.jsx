import { Link as RouterLink } from "react-router-dom";
import { Link, Badge, BadgeGroup, Col, Container, Row, Text, Title, Tab, Tabs, Icon } from "@dataesr/react-dsfr";
import { encode } from "../../../../utils/string";
import CopyBadgeButton from "../../../../components/copy/copy-badge-button";
import { publicationTypeMapping } from "../../../../utils/string";
import SharePage from "../../../../components/share";
import OaDonut from "../../../../components/oa-donut";
import BarLink from "../../../../components/bar-link";


function getOaInfo(publications) {
  const oaCount = publications?.filter((publi) => publi.isOa)?.length;
  const oaTotal = publications?.length;
  return { oaPercent: Math.ceil(oaCount / oaTotal * 100), oaCount, oaTotal };
}

export default function Author({ data }) {
  const maxCommonPublications = Math.max(...data.coAuthors?.map((el) => el.count));
  const maxReviews = Math.max(...data.reviews?.map((el) => el.count));
  const thesis = data?.publications?.filter((publi) => {
    return (publi.type === 'these') && publi.authors.find((author) => author.person === data.id)?.role === 'author';
  })?.[0];
  const thesisParticipations = data?.publications?.filter((publi) => {
    return (publi.type === 'these') && publi.authors.find((author) => author.person === data.id)?.role !== 'author';
  });
  const publications = data?.publications?.filter((publi) => publi.type !== 'these');

  const { oaPercent, oaCount, oaTotal } = getOaInfo(publications);

  const awards = data?.awards?.map((award) => award.label) || [];

  return (
    <Container fluid>
      <Row gutters>
        <Col n="12 lg-8">
          <Row gutters>
            <Col n="12">
              <BadgeGroup>
                <Badge type="info" noIcon text="Auteur" />
                {data.gender && <Badge className="fr-pl-2w" type="new" icon={data.gender === "M" ? 'ri-men-line' : 'ri-women-line'} text={""} />}
              </BadgeGroup>
              <Title className="fr-mb-1v" as="h1" look="h4">{data?.fullName}</Title>
              {awards.map((award) => (
                <div style={{ display: "flex" }}>
                  <Icon color="var(--green-emeraude-main-632)" size="1x" className="fr-mr-1v" name="ri-award-fill" />
                  <Text className="fr-mb-0" as="span" size="sm">{award}</Text>
                </div>
              ))}
            </Col>
            <Col n="12">
              <Text bold className="fr-mb-1v">
                Concepts wikidata
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour rechercher d'autres publications contenant le mot-clé
              </Text>
              <BadgeGroup>
                {data.wikis?.map((wiki) => (
                  <Badge key={wiki.value} isSmall text={wiki.value} onClick={() => { }} />
                ))}
              </BadgeGroup>
            </Col>
            <Col className="fr-mt-5w" n="12">
              <Tabs>
                {(publications.length > 0) ? (<Tab className="authors-publications-tabs" label={`Publications (${publications.length || 0})`}>
                  {publications?.map((publi) => (
                    <>
                      <div className="fr-mb-3w" key={publi.id}>
                        <BadgeGroup className="fr-mt-1v">
                          <Badge isSmall type="info" noIcon text={publicationTypeMapping[publi.type] || "Autre"} />
                          <Badge className="fr-pl-2w" isSmall type={publi.isOa ? 'success' : 'error'} icon={publi.isOa ? 'ri-lock-unlock-line' : 'ri-lock-line'} text={""} />
                        </BadgeGroup>
                        <Link as={<RouterLink to={`/publications/${encode(publi.id || "")}`} />} className="fr-link">{publi.title.default || publi.title?.fr || publi.title?.en}</Link>
                        <Text bold size="sm" className="fr-mb-0">
                          {publi?.authors?.map((author, i) => (
                            <>
                              {(i > 0) ? ', ' : ''}
                              {(author?.person) ? <Link as={<RouterLink to={`/authors/${encode(author.person || "")}`} />}>{author.fullName}</Link> : author.fullName}
                            </>
                          ))}
                        </Text>
                        <Text size="sm" className="fr-card__detail fr-mb-0">
                          <i>
                            {publi?.source?.title && `${publi?.source?.title}`}
                            {publi?.source?.volume && `, ${publi.source?.volume}`}
                            {publi?.source?.issue && ` (${publi.source?.issue})`}
                            {(publi?.year && publi?.source?.title) && ", "}
                            {publi?.year && `${publi.year}`}
                            {publi?.source?.publisher && `, ${publi?.source?.publisher}`}
                          </i>
                        </Text>
                      </div>
                      <hr />
                    </>
                  ))}
                </Tab>) : null}
                {thesis && <Tab className="authors-publications-tabs" label="Thèse de l'auteur" icon="ri-link">
                  <div className="fr-mb-3w" key={thesis.id}>
                    <BadgeGroup className="fr-mt-1v">
                      <Badge isSmall type="info" noIcon text={publicationTypeMapping[thesis.type] || "Autre"} />
                      <Badge className="fr-pl-2w" isSmall type={thesis.isOa ? 'success' : 'error'} icon={thesis.isOa ? 'ri-lock-unlock-line' : 'ri-lock-line'} text={""} />
                    </BadgeGroup>
                    <Link as={<RouterLink to={`/publications/${encode(thesis.id || "")}`} />} className="fr-link">{thesis.title.default || thesis.title?.fr || thesis.title?.en}</Link>
                    <Text bold size="sm" className="fr-mb-0">
                      {thesis.authors?.map((author, i) => (
                        <>
                          {(i > 0) ? ', ' : ''}
                          {(author?.person) ? <Link as={<RouterLink to={`/authors/${encode(author.person || "")}`} />}>{author.fullName}</Link> : author.fullName}
                        </>
                      ))}
                    </Text>
                    <Text size="sm" className="fr-card__detail fr-mb-0">
                      <i>
                        {thesis.source?.title && `${thesis.source?.title}`}
                        {thesis.source?.volume && `, ${thesis.source?.volume}`}
                        {thesis.source?.issue && ` (${thesis.source?.issue})`}
                        {(thesis.year && thesis.source?.title) && ", "}
                        {thesis.year && `${thesis.year}`}
                        {thesis.source?.publisher && `, ${thesis.source?.publisher}`}
                      </i>
                    </Text>
                  </div>
                </Tab>}
                {(thesisParticipations.length > 0) ? (<Tab className="authors-publications-tabs" label={`Participations à des jury de thèse (${thesisParticipations.length || 0})`}>
                  {thesisParticipations?.map((publi) => (
                    <>
                      <div className="fr-mb-3w" key={publi.id}>
                        <BadgeGroup className="fr-mt-1v">
                          <Badge isSmall type="info" noIcon text={publicationTypeMapping[publi.type] || "Autre"} />
                          <Badge className="fr-pl-2w" isSmall type={publi.isOa ? 'success' : 'error'} icon={publi.isOa ? 'ri-lock-unlock-line' : 'ri-lock-line'} text={""} />
                        </BadgeGroup>
                        <Link as={<RouterLink to={`/publications/${encode(publi.id || "")}`} />} className="fr-link">{publi.title.default || publi.title?.fr || publi.title?.en}</Link>
                        <Text bold size="sm" className="fr-mb-0">
                          {publi?.authors?.map((author, i) => (
                            <>
                              {(i > 0) ? ', ' : ''}
                              {(author?.person) ? <Link as={<RouterLink to={`/authors/${encode(author.person || "")}`} />}>{author.fullName}</Link> : author.fullName}
                            </>
                          ))}
                        </Text>
                        <Text size="sm" className="fr-card__detail fr-mb-0">
                          <i>
                            {publi?.source?.title && `${publi?.source?.title}`}
                            {publi?.source?.volume && `, ${publi.source?.volume}`}
                            {publi?.source?.issue && ` (${publi.source?.issue})`}
                            {(publi?.year && publi?.source?.title) && ", "}
                            {publi?.year && `${publi.year}`}
                            {publi?.source?.publisher && `, ${publi?.source?.publisher}`}
                          </i>
                        </Text>
                      </div>
                      <hr />
                    </>
                  ))}
                </Tab>) : null}
              </Tabs>
            </Col>
          </Row>
        </Col>
        <Col n="md-4 lg-3 offset-lg-1">
          <Row gutters>
            <Col n="12">
              <SharePage />
            </Col>
            <Col n="12">
              <hr />
              <Text bold className="fr-mb-1v">
                Identifiants de l'auteur
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour copier l'identifiant dans le press-papier
              </Text>
              <BadgeGroup>
                {data.externalIds
                  ?.filter((ext) => ext?.type !== 'scanr')
                  .map((ext) => <CopyBadgeButton key={ext.id} lowercase isSmall text={ext.id} />)
                }
              </BadgeGroup>
            </Col>
            <Col n="12">
              <hr />
              <Text bold className="fr-mb-1v">
                Publications en accès ouvert ({oaCount}/{oaTotal})
              </Text>
              <OaDonut percent={oaPercent} />
            </Col>
            <Col n="12">
              <hr />
              <Text bold className="fr-mb-1v">
                Principaux co-auteurs
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour accèder la page du co-auteur
              </Text>
              {data.coAuthors?.slice(0, 6)?.map((coAuthor) => (
                <BarLink
                  key={coAuthor.value}
                  name={coAuthor.label}
                  count={coAuthor.count}
                  width={coAuthor.count * 100 / maxCommonPublications}
                  href={`/authors/${coAuthor.value}`}
                />
              ))}
            </Col>
            <Col n="12">
              <hr />
              <Text bold className="fr-mb-1v">
                Principales revues
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour rechercher des publications de la revue
              </Text>
              {data.reviews?.slice(0, 6)?.map((review) => (
                <BarLink
                  key={review.sourceTitle}
                  name={review.sourceTitle}
                  count={review.count}
                  width={review.count * 100 / maxReviews}
                  href={`/authors/${review.sourceTitle}`}
                />
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}