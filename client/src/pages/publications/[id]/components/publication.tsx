import { Link, Badge, BadgeGroup, Button, ButtonGroup, Col, Container, Row, Tab, Tabs, Text, Title } from "@dataesr/dsfr-plus";
import { encode } from "../../../../utils/string";
import CopyBadgeButton from "../../../../components/copy/copy-badge-button";
import { useQuery } from "@tanstack/react-query";
import { getMorePublicationsLikeThis } from "../../../../api/publications";
import { publicationTypeMapping } from "../../../../utils/string";
import SharePage from "../../../../components/share";
import Skeleton from "../../../../components/skeleton/search-result-list-skeleton";
import PublicationItem from "../../../search/components/publications/publication-item";


export default function Publication({ data }) {
  const { data: moreLikeThis, isLoading, isError } = useQuery({
    queryKey: ["morePublicationLike", data._id],
    queryFn: () => getMorePublicationsLikeThis(data._id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const authors = data.authors?.filter((author) => author.role === "author") || [];
  const keywords = data?.domains?.filter((domain) => domain.type === "keyword").map((domain) => domain.label?.default) || [];
  const wikis = data?.domains?.filter((domain) => domain.type === "wikidata").map((domain) => domain.label?.default) || [];
  const affiliations = data?.authors
    ?.flatMap(({ affiliations }) => affiliations?.filter((affiliation) => affiliation.name))
    .reduce((acc, cur) => {
      if (!cur) return acc;
      if (cur.rnsr) {
        return [...acc.filter(a => a.rnsr), cur];
      }
      if (acc.filter(a => a.rnsr).length > 0) {
        return acc;
      }
      return [...acc, cur];
    }, [])
    .reduce((acc, cur) => {
      if (acc.find(a => a.name === cur.name)) {
        return acc;
      }
      return [...acc, cur];
    }, [])
    .map((affiliation, index) => {
      const authors = data.authors
        ?.filter((author) => author.affiliations?.find((a) => a.name === affiliation.name))
        .map((author) => author.fullName);
      return { ...affiliation, index, authors }
    });

  return (
    <Container fluid>
      <Row gutters>
        <Col xs="12" lg="8">
          <Row gutters>
            <Col xs="12">
              <BadgeGroup>
                <Badge variant="info" noIcon>Publication</Badge>
                <Badge variant="new" noIcon>{publicationTypeMapping[data.type]}</Badge>
              </BadgeGroup>
              <Title className="fr-mb-1v" as="h1" look="h4">{data.title.default}</Title>
              <Text bold size="sm" className="fr-mb-1v">
                {authors.map((author, i) => (
                  <>
                    {(i > 0) ? ', ' : ''}
                    {(author?.person) ? <Link href={`/authors/${encode(author.person)}`}>{author.fullName}</Link> : author.fullName}
                    {affiliations
                      ?.filter((affiliation) => affiliation.authors.includes(author.fullName))
                      .map((affiliation, i) => (
                        <>
                          <sup>
                            {(i > 0) ? ', ' : ''}
                            {affiliation.index + 1}
                          </sup>
                        </>
                      )
                      )}
                  </>
                ))}
              </Text>
              <Text bold size="md" className="fr-card__detail">
                {data?.source?.title && `${data.source.title}`}
                {data?.source?.volume && `, ${data.source.volume}`}
                {data?.source?.issue && ` (${data.source.issue})`}
                {(data?.year && data.source.title) && ", "}
                {data?.year && `${data.year}`}
                {data?.source?.publisher && `, ${data.source.publisher}`}
              </Text>

            </Col>
            <Col xs="12">
              <Text bold size="lead">Résumé</Text>
              {(data?.summary?.default || data?.summary?.fr || data?.summary?.en)
                ? <Text size="sm">{data?.summary.default || data?.summary.fr || data?.summary.en}</Text>
                : <Text size="sm"><i>Aucun résumé disponible</i></Text>
              }
            </Col>
            {affiliations?.length > 0 ? (<Col xs="12">
              <Text bold size="lead">Affiliations des auteurs</Text>
              <Row gutters>
                <Col xs="12">
                  {affiliations.map((affiliation, i) => (
                    <div style={{ display: 'inline-flex' }} key={i}>
                      <sup>{affiliation.index + 1}</sup>
                      {' '}
                      <div>
                        {affiliation?.rnsr ? <Link href={`/organizations/${affiliation.rnsr}`}>{affiliation.name}</Link> : affiliation.name}
                      </div>
                    </div>
                  )
                  )}
                </Col>
              </Row>
            </Col>) : null}
            {data.projects?.length > 0 ? (
              <Col xs="12">
                <Text bold size="lead">Financements</Text>
                {data?.projects.map((project) => (
                  <>
                    <Link className="fr-link fr-text--md" href={`/projects/${project?.id}`}>
                      {project?.label?.fr || project?.label?.en || project?.label?.default}
                    </Link>
                    <Text as='span' size="md" className="fr-card__detail">
                      <i>
                        {project?.id}
                        {(project?.type || project.year) && " — "}
                        {project.type && `${project.type}`}
                        {(project?.year && project.type) && " — "}
                        {project?.year && `${project.year}`}
                      </i>
                    </Text>
                    <br />
                  </>
                ))}
              </Col>
            ) : null}
          </Row>
          <Row className="fr-my-5w">
            <Tabs index="None">
              <Tab index="1" className='more-like-this' label="Publications similaires" icon="link">
                {isLoading && <Skeleton />}
                {isError && <div>Une erreur est survenue au chargement des données</div>}
                <div className="result-list">
                  {moreLikeThis?.map((like) => (
                    <PublicationItem data={like} key={like.id} />
                  ))}
                </div>
              </Tab>
              <Tab index="2" label="Références de l'article" icon="link">
                <h3>Références opencitations</h3>
              </Tab>
              <Tab index="3" label="Citations de l'article" icon="link">
                <h3>Citations opencitations</h3>
              </Tab>
            </Tabs>
          </Row>
        </Col>
        <Col md="4" lg="3" offsetLg="1">
          <Row gutters>
            <Col xs="12">
              <Text bold className="fr-mb-1w">
                Accéder à la publication
              </Text>
              <Badge variant={data.isOa ? 'success' : 'error'} icon={data.isOa ? 'ri-lock-unlock-line' : 'ri-lock-line'}>{data.isOa ? 'Accès ouvert' : 'Accès fermé'}</Badge>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Publication en accès {data.isOa ? 'ouvert' : 'fermé'}
                {' '}
                {data.isOa ? ` sur ${data.oaEvidence?.hostType} dans sa version ${data.oaEvidence?.version}` : ''}
              </Text>
              <ButtonGroup size="sm">
                {data.isOa && <Button icon="ri-file-download-line" iconPosition="right">Télécharger la publication</Button>}
                <Button variant="tertiary" icon="ri-external-link-line" iconPosition="right">
                  Voir sur le site de
                  {' '}
                  {data.oaEvidence?.hostType}
                </Button>
              </ButtonGroup>
              <hr />
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Publication en accès {data.source.isOa ? 'ouvert' : 'fermé'}
                {' '}
                sur le site de l'éditeur
              </Text>
              <ButtonGroup size="sm">
                <Button variant="tertiary" icon="ri-external-link-line" iconPosition="right">
                  Voir sur la page de l'éditeur
                </Button>
              </ButtonGroup>
            </Col>

            <Col xs="12">
              <hr />
              <Text bold className="fr-mb-1v">
                Identifiants de la publication
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour copier l'identifiant dans le press-papier
              </Text>
              <BadgeGroup>
                {data.externalIds
                  ?.filter((ext) => ext?.type !== 'scanr')
                  .map((ext) => <CopyBadgeButton key={ext.id} lowercase size="sm" text={ext.id} />)
                }
              </BadgeGroup>
            </Col>
            <Col xs="12">
              <hr />
              <Text bold className="fr-mb-1v">
                Mots-clés
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour rechercher d'autres publications contenant le mot-clé
              </Text>
              <BadgeGroup>
                {keywords?.map((keyword) => (
                  <Badge key={keyword} size="sm">{keyword}</Badge>
                ))}
              </BadgeGroup>
            </Col>
            <Col xs="12">
              <hr />
              <Text bold className="fr-mb-1v">
                Concepts wikidata
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour voir la page wikipédia
              </Text>
              <BadgeGroup>
                {wikis?.map((keyword) => (
                  <Badge key={keyword} size="sm">{keyword}</Badge>
                ))}
              </BadgeGroup>
            </Col>
            <Col xs="12">
              <hr />
              <SharePage />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}