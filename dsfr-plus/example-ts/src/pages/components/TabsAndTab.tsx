import { Breadcrumb, Tabs, Tab, Container, Title, Text, Row, Col, Link } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const tabs = `
<Tabs>
  <Tab label="Label Tab 1" icon="checkbox-line">
    <p>Hello Tab 1</p>
  </Tab>
  <Tab label="Label Tab 2" icon="user-line">
    <p>Hello Tab 2</p>
  </Tab>
  <Tab label="Label Tab 3" icon="user-line">
    <p>Hello Tab 3</p>
  </Tab>
</Tabs>
`;

export function TabsAndTab() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link>Onglets - Tabs</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Onglets - Tabs</Title>
          <Text>
            Le composant onglet permet aux utilisateurs de naviguer dans différentes
            sections de contenu au sein d’une même page.
          </Text>
          <Text>
            Le système d'onglet aide à regrouper différents contenus dans un espace
            limité et permet de diviser un contenu dense en sections accessibles
            individuellement afin de faciliter la lecture pour l'utilisateur.
          </Text>
          <Playground code={tabs} scope={{ Tabs, Tab }} defaultShowCode />
        </Col>
      </Row>
    </Container>
  )
}
