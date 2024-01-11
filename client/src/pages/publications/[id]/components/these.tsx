import { Link, Badge, BadgeGroup, Button, ButtonGroup, Col, Container, Row, Text, Title } from "@dataesr/dsfr-plus";
import Map from "../../../../components/map";
import { getMarkers } from "../../../../utils/map";
import Share from "../../../../components/share";

export default function These({ data }) {
  const author = data.authors?.filter((author) => author.role === "author")?.[0] || {};
  const directors = data.authors?.filter((author) => author.role === "directeurthese") || [];
  const president = data.authors?.filter((author) => author.role === "presidentjury")?.[0] || {};
  const membres = data.authors?.filter((author) => author.role === "membrejury") || [];
  const rapporteurs = data.authors?.filter((author) => author.role === "rapporteur") || [];
  const keywords = data.domains?.filter((domain) => domain.type === "keyword").map((domain) => domain.label?.default) || [];
  const wikis = data.domains?.filter((domain) => domain.type === "wikidata").map((domain) => domain.label?.default) || [];
  const affiliations = data.affiliations?.filter((affiliation) => affiliation.label) || [];

  return (
    <Container fluid>
      <Row gutters>
        <Col className="fr-pr-8w" xs="12" lg="9">
          <Row gutters>
            <Col xs="12">
              <BadgeGroup>
                <Badge variant="info" noIcon>Thèse</Badge>
                <Badge variant={data.isOa ? 'success' : 'error'} icon={data.isOa ? 'lock-unlock-line' : 'lock-line'}>
                  {data.isOa ? 'Accès ouvert' : 'Accès fermé'}
                </Badge>
              </BadgeGroup>
              <Title className="fr-mb-0" as="h1" look="h4">{data.title.default}</Title>
              <Text bold size="sm">
                par <Link className="fr-link fr-text--lg" href={`/authors/${author.person}`}>{author.fullName}</Link>,
                {' '}
                soutenue le {new Date(data.publicationDate).toLocaleDateString('FR-fr', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' '}
                sous la direction de {directors.map((director, i) => (
                  <>
                    {(i > 0) ? ', ' : ''}
                    <Link className="fr-link fr-text--sm" href={`/authors/${director.person}`}>
                      {director.fullName}
                    </Link>
                  </>
                ))}
              </Text>
            </Col>
            <Col xs="12">
              <Text bold size="lead">Résumé</Text>
              <Text size="sm">{data?.summary?.default}</Text>
            </Col>
            <Col xs="12">
              <Text bold size="lead">Composition du jury</Text>
              <Text className="fr-mb-1v">
                <Text as="span" className="fr-text--grey" bold>Président: </Text>
                <Text as="span"><Link className="fr-link" href={`/authors/${president.person}`}>{president.fullName}</Link></Text>
              </Text>
              <Text className="fr-mb-1v">
                <Text as="span" className="fr-text--grey" bold>Directeur de thèse: </Text>
                <Text as="span">{directors.map((aut, i) => (<>{(i > 0) ? ', ' : ''}<Link className="fr-link" href={`/authors/${aut.person}`}>{aut.fullName}</Link></>))}</Text>
              </Text>
              <Text className="fr-mb-1v">
                <Text as="span" className="fr-text--grey" bold>Membres du jury: </Text>
                <Text as="span">{membres.map((aut, i) => (<>{(i > 0) ? ', ' : ''}<Link className="fr-link" href={`/authors/${aut.person}`}>{aut.fullName}</Link></>))}</Text>
              </Text>
              <Text>
                <Text as="span" className="fr-text--grey" bold>Rapporteurs: </Text>
                <Text as="span">{rapporteurs.map((aut, i) => (<>{(i > 0) ? ', ' : ''}<Link className="fr-link" href={`/authors/${aut.person}`}>{aut.fullName}</Link></>))}</Text>
              </Text>
            </Col>
            <Col xs="12">
              <Text bold size="lead">Affiliations</Text>
              <Row gutters>
                <Col xs="6">
                  {affiliations.map((affiliation, i) => (
                    <Row gutters key={i}>
                      <Col xs="2">
                        <span className="ri-building-line" />
                      </Col>
                      <Col>
                        <Link className="fr-link" href={`/organizations/${affiliation.id}`}>{affiliation.label.fr || affiliation.label.en || affiliation.label.default}</Link>
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col xs="6">
                  <Map height="320px" markers={getMarkers(data?.affiliations || [])} zoom={8} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs="1" lg="3" className="fr-pl-6w fr-pt-6w">
          <Row gutters>
            <Col xs="12">
              <Text bold className="fr-mb-1v">
                Mots-clés
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="xs">
                Cliquez pour rechercher d'autres publications contenant le mot-clé
              </Text>
              <BadgeGroup>
                {keywords?.map((keyword) => (
                  <Badge key={keyword} size="sm" onClick={() => { }}>{keyword}</Badge>
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
                  <Badge key={keyword} size="sm" onClick={() => { }}>{keyword}</Badge>
                ))}
              </BadgeGroup>
            </Col>
            <Col xs="12">
              <hr />
              <Text bold className="fr-mb-2w">
                Plus sur cette thèse ?
              </Text>
              <ButtonGroup size="sm">
                {data.isOa && <Button variant="tertiary" icon="ri-file-download-line" iconPosition="right">Télécharger la thèse</Button>}
                <Button variant="tertiary" icon="ri-external-link-line" iconPosition="right">Voir sur thèse.fr</Button>
              </ButtonGroup>
            </Col>
            <Col xs="12">
              <hr />
              <Share />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}