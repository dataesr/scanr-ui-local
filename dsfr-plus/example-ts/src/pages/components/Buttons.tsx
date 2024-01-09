import { Alert, Button, ButtonGroup, Container, Row, Col, Title, Text, Link, Breadcrumb } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const button = `
<Button>Bouton</Button>
`

const variants = `
<ButtonGroup isInlineFrom="xs">
  <Button variant="primary">Bouton</Button>
  <Button variant="secondary">Bouton</Button>
  <Button variant="tertiary">Bouton</Button>
  <Button variant="text">Bouton</Button>
</div>
`

const disabled = `
<ButtonGroup isInlineFrom="xs">
  <Button disabled variant="primary">Bouton</Button>
  <Button disabled variant="secondary">Bouton</Button>
  <Button disabled variant="tertiary">Bouton</Button>
  <Button disabled variant="text">Bouton</Button>
</ButtonGroup>
`

const buttonGroup = `
<ButtonGroup isInlineFrom="xs">
  <Button>Bouton 1</Button>
  <Button>Bouton 2</Button>
</ButtonGroup>
`

const icons = `
<ButtonGroup isInlineFrom="xs">
  <Button icon="user-line" variant="primary">Bouton</Button>
  <Button icon="user-line" iconPosition="right" variant="secondary">Bouton</Button>
</ButtonGroup>
`

const sizes1 = `
<>
  <div className="fr-mb-2w">
    <Button size="sm" variant="primary">Bouton</Button>
  </div>
  <div className="fr-mb-2w">
    <Button size="md" variant="primary">Bouton</Button>
  </div>
  <div className="fr-mb-2w">
    <Button size="lg" variant="primary">Bouton</Button>
  </div>
</>
`

const sizes2 = `
<>
  <ButtonGroup size="sm" isInlineFrom="xs">
    <Button variant="primary">Bouton</Button>
    <Button variant="primary">Bouton</Button>
    <Button variant="primary">Bouton</Button>
  </ButtonGroup>
  <ButtonGroup size="md" isInlineFrom="xs">
    <Button variant="primary">Bouton</Button>
    <Button variant="primary">Bouton</Button>
    <Button variant="primary">Bouton</Button>
  </ButtonGroup>
  <ButtonGroup size="lg" isInlineFrom="xs">
    <Button variant="primary">Bouton</Button>
    <Button variant="primary">Bouton</Button>
    <Button variant="primary">Bouton</Button>
  </ButtonGroup>
</>
`

const iconsAlone = `
<ButtonGroup isInlineFrom="xs">
  <Button icon="user-line" variant="primary" title="Bouton"/>
  <Button icon="user-line" iconPosition="right" variant="secondary" title="Bouton"/>
  <Button icon="user-line" iconPosition="right" variant="tertiary" title="Bouton"/>
  <Button icon="user-line" iconPosition="right" variant="text" title="Bouton"/>
</ButtonGroup>
`

const colors = `
<>
  <ButtonGroup isInlineFrom="xs">
    <Button color="green-emeraude" variant="primary">Bouton</Button>
    <Button color="yellow-tournesol" variant="primary">Bouton</Button>
    <Button color="blue-cumulus" variant="primary">Bouton</Button>
    <Button color="purple-glycine" variant="primary">Bouton</Button>
  </ButtonGroup>
  <ButtonGroup isInlineFrom="xs">
    <Button color="green-emeraude" variant="secondary">Bouton</Button>
    <Button color="yellow-tournesol" variant="secondary">Bouton</Button>
    <Button color="blue-cumulus" variant="secondary">Bouton</Button>
    <Button color="purple-glycine" variant="secondary">Bouton</Button>
  </ButtonGroup>
  <ButtonGroup isInlineFrom="xs">
    <Button color="green-emeraude" variant="tertiary">Bouton</Button>
    <Button color="yellow-tournesol" variant="tertiary">Bouton</Button>
    <Button color="blue-cumulus" variant="tertiary">Bouton</Button>
    <Button color="purple-glycine" variant="tertiary">Bouton</Button>
  </ButtonGroup>
  <ButtonGroup isInlineFrom="xs">
    <Button color="green-emeraude" variant="text">Bouton</Button>
    <Button color="yellow-tournesol" variant="text">Bouton</Button>
    <Button color="blue-cumulus" variant="text">Bouton</Button>
    <Button color="purple-glycine" variant="text">Bouton</Button>
  </ButtonGroup>
</>
`


export function Buttons() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Bouton - Button</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Bouton - Button</Title>
          <Text>
            Le bouton est un élément d’interaction avec l’interface permettant à l’utilisateur d’effectuer une action.
          </Text>
          <Playground code={button} scope={{ Button }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Groupes de boutons</Title>
          <Text>
            Afin de gérer l'espacement lorsque plusieurs boutons sont acollés, il est recommandé d'utiliser le composant `ButtonGroup`.
            Par default les Boutons font 100% de la largeur.
            Vous pouvez les mettre sur une ligne a partir d'un certain `breakpoint`.
          </Text>
          <Playground code={buttonGroup} scope={{ Button, ButtonGroup }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Variants</Title>
          <Text as="span">
            Plusieurs variant sont disponibles:
            <ul>
              <li>`primary` - un bouton plein pour les actions importantes</li>
              <li>`secondary` - un bouton avec bordure pour les actions secondaires</li>
              <li>`tertiary` - un bouton avec bordure grise</li>
              <li>`text`- un bouton sans bordure</li>
            </ul>
          </Text>
          <Playground code={variants} scope={{ Button, ButtonGroup }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Etat désactivé</Title>
          <Playground code={disabled} scope={{ Button, ButtonGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Avec icônes</Title>
          <Text>
            Un utilisation avec icone est possible avec les propriétés `icon` et `iconPosition`
          </Text>
          <Playground code={icons} scope={{ Button, ButtonGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Avec icônes seules</Title>
          <Text>
            Vous pouvez utiliser des icônes seules dans un bouton. Il est recommandé d'ajouter une propriété `title` dans ce cas.
          </Text>
          <Playground code={iconsAlone} scope={{ Button, ButtonGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Taille disponibles</Title>
          <Text>
            Les boutons sont disponibles en trois tailles: `sm`, `md` et `lg`. La valeur par default est `md`.
          </Text>
          <Playground code={sizes1} scope={{ Button, ButtonGroup }} />
          <Text>
            Dans un groupe de boutons, la taille est gérée par le composant `ButtonGroup`.
          </Text>
          <Playground code={sizes2} scope={{ Button, ButtonGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Bouton de couleur</Title>
          <Alert className='fr-my-2w' variant="warning" title="Ajout du react-dsfr" description="Ceci est un ajout du react-dsfr et n'est pas recommandé par le système de design de l'état.
          Ne l'utilisez pas sur un site grand public." />
          <Text>
            La version React offre la possibilité d'utiliser des boutons avec les couleurs définis par le design system.
          </Text>
          <Playground code={colors} scope={{ Button, ButtonGroup }} />
        </Col>
      </Row>
    </Container>
  )
}