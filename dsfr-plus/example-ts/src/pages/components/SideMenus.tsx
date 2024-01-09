import { Breadcrumb, SideMenu, SideMenuItem, Link, Container, Title, Text, Row, Col } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const sidemenu = `
<Container>
  <Row>
    <Col xs={12} md={8}>
      <SideMenu>
        <Link href="/utilisation">Utilisation</Link>
        <SideMenuItem defaultExpanded title="Composants">
          <Link href="/composants/accordion">Accordéon - Accordion</Link>
          <Link href="/composants/alert">Alerte - Alert</Link>
          <Link href="/composants/badge">Badge - Badge</Link>
          <Link href="/composants/button">Bouton - Button</Link>
          <Link href="/composants/fil-d-ariane">Fil d'Ariane - Breadcrumb</Link>
          <Link current href="/composants/menu-lateral">Menu latéral - SideMenu</Link>
          <Link href="/composants/notice">Bandeau d'information importante - Notice</Link>
        </SideMenuItem>
      </SideMenu>
    </Col>
    <Col xs={12} md={4}>
      <span />
    </Col>
  </Row>
</Container>
`;

const sidemenuRight = `
<Container>
  <Row>
    <Col xs={12} md={4}>
      <span />
    </Col>
    <Col xs={12} md={8}>
      <SideMenu position="right">
        <Link href="/utilisation">Utilisation</Link>
        <SideMenuItem defaultExpanded title="Composants">
          <Link href="/composants/accordion">
            Accordéon - Accordion
          </Link>
          <Link href="/composants/alert">
            Alerte - Alert
          </Link>
          <Link href="/composants/badge">
            Badge - Badge
          </Link>
          <Link href="/composants/button">
            Bouton - Button
          </Link>
          <Link href="/composants/fil-d-ariane">
            Fil d'Ariane - Breadcrumb
          </Link>
          <Link current href="/composants/menu-lateral">
            Menu latéral - SideMenu
          </Link>
          <Link href="/composants/notice">
            Bandeau d'information importante - Notice
          </Link>
        </SideMenuItem>
      </SideMenu>
    </Col>
  </Row>
</Container>
`;
const sidemenuStickyFullHeight = `
<Container>
  <Row>
    <Col xs={12} md={8}>
      <SideMenu sticky fullHeight>
        <Link href="/utilisation">Utilisation</Link>
        <SideMenuItem defaultExpanded title="Composants">
          <Link href="/composants/accordion">
            Accordéon - Accordion
          </Link>
          <Link href="/composants/alert">
            Alerte - Alert
          </Link>
          <Link href="/composants/badge">
            Badge - Badge
          </Link>
          <Link href="/composants/button">
            Bouton - Button
          </Link>
          <Link href="/composants/fil-d-ariane">
            Fil d'Ariane - Breadcrumb
          </Link>
          <Link current href="/composants/menu-lateral">
            Menu latéral - SideMenu
          </Link>
          <Link href="/composants/notice">
            Bandeau d'information importante - Notice
          </Link>
        </SideMenuItem>
      </SideMenu>
    </Col>
    <Col xs={12} md={4}>
      <span />
    </Col>
  </Row>
</Container>
`;

export function SideMenus() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link>Menu latéral - Sidemenu</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Menu latéral - Sidemenu</Title>
          <Text>
            Le menu latéral permet aux utilisateurs de naviguer entre les différentes
            pages d’une rubrique ou d’un même thème.
          </Text>
          <Text>
            Le menu latéral est un système de navigation vertical présentant une liste
            de liens placée à côté du contenu (à gauche ou à droite de la page) et
            donnant accès jusqu'à 3 niveaux d’arborescence.
          </Text>
          <Text>
            Ce composant doit être utilisé sur les sites avec un niveau de profondeur
            assez important (2 niveaux de navigation ou plus).
          </Text>
          <Text>
            Le menu latéral se compose d’un titre de rubrique (optionnel) et d’une liste
            de liens sur 3 niveaux (les pages associées à une même rubrique
            sont regroupées dans des collapse).
          </Text>
          <Playground code={sidemenu} scope={{ Container, Row, Col, SideMenu, SideMenuItem, Link }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Utilisation à droite</Title>
          <Text>
            Pour une utilisation à droite de la page, utilisez la propriété `position` avec la valeur `right`.
            La barre de séparation se place a gauche du menu.
          </Text>
          <Playground code={sidemenuRight} scope={{ Container, Row, Col, SideMenu, SideMenuItem, Link }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Menu latéral fixe, affiché sur 100% de la hauteur de page</Title>
          <Text>
            Le menu latéral peut également s’afficher de manière fixe sur votre page, afin de rester visible tout au long de la navigation de l’utilisateur sur la page ouverte.
            Pour cela il suffit d’associer la propriété `sticky`
          </Text>
          <Text>
            Vous pouvez afficher un menu latéral fixe sur 100% de la hauteur de votre page avec la propriété `fullHeight`
          </Text>
          <Playground code={sidemenuStickyFullHeight} scope={{ Container, Row, Col, SideMenu, SideMenuItem, Link }} />
        </Col>
      </Row>
    </Container>
  )
}