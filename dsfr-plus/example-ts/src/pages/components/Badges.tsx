import { Alert, Badge, BadgeGroup, Container, Row, Col, Title, Text, Link, Breadcrumb } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const badge = `
<Badge>Badge</Badge>
`

const variants = `
<>
  <BadgeGroup>
    <Badge variant="new">Nouveau</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="error">Erreur</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Attention</Badge>
  </BadgeGroup>
  <BadgeGroup>
    <Badge noIcon variant="new">Nouveau</Badge>
    <Badge noIcon variant="info">Info</Badge>
    <Badge noIcon variant="error">Erreur</Badge>
    <Badge noIcon variant="success">Success</Badge>
    <Badge noIcon variant="warning">Attention</Badge>
  </BadgeGroup>
</>
`

const badgeGroup = `
<BadgeGroup>
  <Badge>Badge 1</Badge>
  <Badge>Badge 2</Badge>
</BadgeGroup>
`

const icons = `
<BadgeGroup>
  <Badge color="green-emeraude" icon="user-line">Badge</Badge>
  <Badge color="purple-glycine" icon="user-line">Badge</Badge>
</BadgeGroup>
`
const sizes = `
<BadgeGroup>
  <Badge size="sm" variant="new">Nouveau</Badge>
  <Badge size="sm" variant="info">Info</Badge>
  <Badge size="sm" variant="error">Erreur</Badge>
  <Badge size="sm" variant="success">Success</Badge>
  <Badge size="sm" variant="warning">Attention</Badge>
</BadgeGroup>
`
const colors = `
<BadgeGroup>
  <Badge color="green-emeraude">Badge</Badge>
  <Badge color="yellow-tournesol">Badge</Badge>
  <Badge color="blue-cumulus">Badge</Badge>
  <Badge color="purple-glycine">Badge</Badge>
</BadgeGroup>
`

export function Badges() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Badge - Badge</Link>
        </Breadcrumb>
      </Row>
      <Badge variant="info" >Badge</Badge>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Badge - Badge</Title>
          <Text>
            Le composant badge permet de mettre en avant une information de type “statut” ou “état” sur un élément du site.
            Le badge n’est pas un composant cliquable. Il doit être associé à une information donnée sur une page pour préciser le statut ou l'état associée à cette information.
          </Text>
          <Playground code={badge} scope={{ Badge, BadgeGroup }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Groupes de badges</Title>
          <Text>
            Afin de gérer l'espacement lorsque plusieurs badges sont acollés, il est recommandé d'utiliser le composant `BadgeGroup`.
          </Text>
          <Playground code={badgeGroup} scope={{ Badge, BadgeGroup }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Variants</Title>
          <Text>
            Il existe 5 variantes du badge: `new`, `info`, `error`, `success`, et `warning` avec des icones qui leur sont propre.
            Vous pouvez dissimuler l'icone avec la propriété `noIcon`.
          </Text>
          <Playground code={variants} scope={{ Badge, BadgeGroup }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Taille `small`</Title>
          <Text>
            Vous pouvee réduire la taille des badges avec la propriété `isSmall`.
            La taille se gère pour chaque badge à l'intérieur du groupe de badge.
          </Text>
          <Playground code={sizes} scope={{ Badge, BadgeGroup }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Couleurs</Title>
          <Text>
            Les couleurs du design system sont disponibles pour les badges.
          </Text>
          <Playground code={colors} scope={{ Badge, BadgeGroup }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Composition de badge</Title>
          <Alert className='fr-my-2w' variant="warning" title="Ajout du react-dsfr" description="Ceci est un ajout du react-dsfr et n'est pas recommandé par le système de design de l'état.
          Ne l'utilisez pas sur un site grand public." />
          <Text>
            La version React offre la possibilité d'utiliser des boutons avec les couleurs définis par le design system ainsi qu'une icône.
          </Text>
          <Playground code={icons} scope={{ Badge, BadgeGroup }} defaultShowCode />
        </Col>
      </Row>
    </Container>
  )
}