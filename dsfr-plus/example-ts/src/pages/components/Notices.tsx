import { Breadcrumb, Link, Notice, Container, Row, Col, Title, Text, Alert } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const main = `<Notice>
  Label titre du bandeau d'information importante, avec un texte assez long,
  et un <a href='#' rel='noopener' target='_blank'>lien au fil du texte</a>
  lorem ipsum dolor sit lorem ipsum dolor sit.
</Notice>`

const withOnClose = `<Container fluid>
  <Notice
    closeMode="controlled"
    className="fr-mb-2w"
    type="info"
    onClose={() => { console.log('User clicked on close button') }}
  >
    Version controllée. L'affichage est gérée par le composant React
    et peut être faite grace à la props 'onClose'.
  </Notice>
  <Notice
    closeMode="uncontrolled"
    className="fr-mb-2w"
    type="info"
  >
  Version non controllée. Le Bandeau se ferme dès que l'utilisateur 
  clique sur le bouton de fermeture.
  </Notice>
</Container>`

const withColor = `<Container fluid>
  <Notice className="fr-mb-2w" type="warning">
    Label titre du bandeau d'information importante, avec un texte assez long,
    et un <a href='#' rel='noopener' target='_blank'>lien au fil du texte</a>
    lorem ipsum dolor sit lorem ipsum dolor sit.
  </Notice>
  <Notice className="fr-mb-2w" type="error">
    Label titre du bandeau d'information importante, avec un texte assez long,
    et un <a href='#' rel='noopener' target='_blank'>lien au fil du texte</a>
    lorem ipsum dolor sit lorem ipsum dolor sit.
  </Notice>
  <Notice className="fr-mb-2w" type="success">
    Label titre du bandeau d'information importante, avec un texte assez long,
    et un <a href='#' rel='noopener' target='_blank'>lien au fil du texte</a>
    lorem ipsum dolor sit lorem ipsum dolor sit.
  </Notice>
</Container>`

export function Notices() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Bandeau d'information importante - Notice</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Bandeau d'information importante - Notice</Title>
          <Text>
            Le bandeau d’information importante permet aux utilisateurs de voir ou d’accéder à une information importante et temporaire.
          </Text>
          <Text>
            Il est affiché sur l’ensemble des pages en desktop et en mobile. Il affiche une information importante et urgente (un usage trop fréquent risque de faire “disparaitre” ce bandeau).
          </Text>
          <Playground code={main} scope={{ Notice }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2">Fermeture du bandeau</Title>
          <Text>
            Par default, le bandeau ne peut pas être fermé. Deux possibilités sont offertes pour gérer la fermeture. Une version controlée et une non contrôlée.
          </Text>
          <Playground code={withOnClose} scope={{ Notice, Container }} />
        </Col>
        <Col xs={12}>
          <Title as="h2">Bandeau de couleur</Title>
          <Alert className='fr-my-2w' variant="warning" title="Ajout du react-dsfr" description="Ceci est un ajout du react-dsfr et n'est pas recommandé par le système de design de l'état.
          Ne l'utilisez pas sur un site grand public." />
          <Text>
            La version React offre la possibilité d'utiliser le bandeau avec les couleurs 'warning', 'error' et 'success'.
          </Text>
          <Playground code={withColor} scope={{ Notice, Container }} />
        </Col>
      </Row>
    </Container>
  )
}