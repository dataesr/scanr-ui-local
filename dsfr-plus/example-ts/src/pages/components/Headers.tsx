import { Header, Service, Logo, FastAccess, Link, Nav, NavItem, Button, Breadcrumb, SearchBar, Container, Title, Text, Row, Col } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const simplestHeader = `
<Header>
  <Service name="React DSFR" tagline="Une bibliothèque de composants React" />
  <Logo text="Ministère de | l'enseignement supérieur | et de la recherche" />
</Header>
`;
const headerWithFastAccess = `
<Header>
  <Logo text="Gouvernement" />
  <Service name="React DSFR" tagline="Une bibliothèque de composants React" />
  <FastAccess>
    <Button
      href="https://github.com/dataesr/react-dsfr"
      target="_blank"
      rel="noreferer noopener"
      icon="github-fill"
      size="sm"
      variant="text"
    >
      Github
    </Button>
    <Button
      href="https://www.systeme-de-design.gouv.fr"
      target="_blank"
      rel="noreferer noopener"
      icon="code-s-slash-line"
      size="sm"
      variant="text"
    >
      Système de design de l'état
    </Button>
  </FastAccess>
</Header>
`;
const headerWithSearchBar = `
<Header>
  <Logo text="Gouvernement" />
  <Service name="React DSFR" tagline="Une bibliothèque de composants React" />
  <SearchBar />
</Header>
`;
const headerWithFastAccessAndSearchBar = `
<Header>
  <Logo text="Gouvernement" />
  <Service name="React DSFR" tagline="Une bibliothèque de composants React" />
  <FastAccess>
    <Button
      href="https://github.com/dataesr/react-dsfr"
      target="_blank"
      rel="noreferer noopener"
      icon="github-fill"
      size="sm"
      variant="text"
    >
      Github
    </Button>
    <Button
      href="https://www.systeme-de-design.gouv.fr"
      target="_blank"
      rel="noreferer noopener"
      icon="code-s-slash-line"
      size="sm"
      variant="text"
    >
      Système de design de l'état
    </Button>
  </FastAccess>
  <SearchBar />
</Header>
`;
const headerWithNav = `
<Header>
  <Logo text="Gouvernement" />
  <Service name="React DSFR" tagline="Une bibliothèque de composants React" />
  <FastAccess>
    <Button
      href="https://github.com/dataesr/react-dsfr"
      target="_blank"
      rel="noreferer noopener"
      icon="github-fill"
      size="sm"
      variant="text"
    >
      Github
    </Button>
    <Button
      href="https://www.systeme-de-design.gouv.fr"
      target="_blank"
      rel="noreferer noopener"
      icon="code-s-slash-line"
      size="sm"
      variant="text"
    >
      Système de design de l'état
    </Button>
  </FastAccess>
  <Nav>
    <Link current href='#'>Section 1</Link>
    <Link href='#'>Section 2</Link>
    <NavItem current title="Section 3">
      <Link href='#'>Section 3.1</Link>
      <Link current href='#'>Section 3.2</Link>
    </NavItem>
  </Nav>
  <SearchBar />
</Header>
`;

export function Headers() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link>En-tête - Header</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">En-tête - Header</Title>
          <Text>
            L’en-tête permet aux utilisateurs d’identifier sur quel site ils se trouvent.
            Il peut donner accès à la recherche et à certaines pages ou fonctionnalités clés.
          </Text>
          <Text>
            L'en-tête est un composant que vous pouvez composer avec les composant `enfants`.
            Dans un version simple utilisez au minimum les composants `Logo` et `Service`.
            Vous pouvez gérer les retour à la ligne dans composant Logo en utilisant un caractère '|'.
          </Text>
          <Text>
            Vous pouvez composer l'en-tête selon vos besoin. L'ordre des composant enfant n'est pas important.
            Le React-dsfr se charge de les placer au bon endroit.
          </Text>
          <Playground code={simplestHeader} scope={{ Header, Logo, Service }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">En-tête avec accès rapides</Title>
          <Text>
            L’en-tête avec accès rapides doit être utilisé pour les sites souhaitant mettre
            en avant certaines pages/fonctionnalités clés de leur site, comme par exemple
            la connexion à un espace sécurisé.
          </Text>
          <Text>
            Il est composé ici des éléments du haut de page simple et de liens accès rapides.
            Il est possible d’afficher jusqu'à 3 accès rapides maximum.
          </Text>
          <Playground code={headerWithFastAccess} scope={{ Header, Logo, Service, FastAccess, Button }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">En-tête avec barre de recherche</Title>
          <Text>
            L’en-tête avec moteur de recherche doit être utilisé pour les sites souhaitant rendre
            facilement accessible le moteur de recherche. Il est composé ici des éléments du haut
            de page simple et de la barre de recherche medium.
          </Text>
          <Playground code={headerWithSearchBar} scope={{ Header, Logo, Service, SearchBar }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">En-tête avec acceès rapide et barre de recherche</Title>
          <Text>
            Vous pouvez composer en ajoutant à la fois une barre de recherche et des boutons d'accès rapide.
          </Text>
          <Playground code={headerWithFastAccessAndSearchBar} scope={{ Header, Logo, Service, FastAccess, SearchBar, Button }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Avec navigation</Title>
          <Text>
            La navigation principale s'effectue avec les composants `Navigation` et `NavItem`.
            Un NavItem avec sans enfant s'affichera comme un lien, sinon comme un bouton dropdown permettant
            d'acceder à d'autres lien. Vous pouvez donc utiliser un NavItem comme enfant d'un AUtre NavItem.
          </Text>
          <Playground code={headerWithNav} scope={{ Header, Logo, Service, FastAccess, SearchBar, Button, Nav, NavItem, Link }} />
        </Col>
      </Row>
    </Container>
  )
}