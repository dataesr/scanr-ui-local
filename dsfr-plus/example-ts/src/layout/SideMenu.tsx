import { SideMenu, SideMenuItem, Link, Container, Row, Col } from '@dataesr/react-dsfr';
import { Outlet, useLocation } from 'react-router-dom';
import './styles.scss';


export function Side() {
  const { pathname } = useLocation();
  if (!pathname) return null;

  const is = (str: string): boolean => pathname?.startsWith(str)
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <SideMenu title="" sticky fullHeight className="padded-sidemenu">
            <SideMenuItem
              defaultExpanded={is('/utilisation')}
              title="Utilisation"
            >
              <Link current={is('/utilisation/demarrage-rapide')} href="/utilisation/demarrage-rapide">Démarrage rapide</Link>
            </SideMenuItem>
            <SideMenuItem
              defaultExpanded={is('/composants')}
              title="Composants"
            >
              <Link current={is('/composants/accordion')} href="/composants/accordion">
                Accordéon - Accordion
              </Link>
              <Link current={is('/composants/alert')} href="/composants/alert">
                Alerte - Alert
              </Link>
              <Link current={is('/composants/ajout-de-fichier')} href="/composants/ajout-de-fichier">
                Ajout de fichier - FileUpload
              </Link>
              <Link current={is('/composants/badge')} href="/composants/badge">
                Badge - Badge
              </Link>
              <Link current={is('/composants/button')} href="/composants/button">
                Bouton - Button
              </Link>
              <Link current={is('/composants/en-tete')} href="/composants/en-tete">
                En-tête - Header
              </Link>
              <Link current={is('/composants/fil-d-ariane')} href="/composants/fil-d-ariane">
                Fil d'Ariane - Breadcrumb
              </Link>
              <Link current={is('/composants/indicateur-d-etape')} href="/composants/indicateur-d-etape">
                Indicateur d'étapes - Stepper
              </Link>
              <Link current={is('/composants/interrupteur')} href="/composants/interrupteur">
                Interrupteur - Toggle
              </Link>
              <Link current={is('/composants/menu-lateral')} href="/composants/menu-lateral">
                Menu latéral - Sidemenu
              </Link>
              <Link current={is('/composants/modal')} href="/composants/modal">
                Modale - Modal
              </Link>
              <Link current={is('/composants/notice')} href="/composants/notice">
                Bandeau d'information importante - Notice
              </Link>
              <Link current={is('/composants/radio')} href="/composants/radio">
                Bouton Radio - Radio
              </Link>
              <Link current={is('/composants/input')} href="/composants/input">
                Champ de saisie - Input
              </Link>
              <Link current={is('/composants/checkbox')} href="/composants/checkbox">
                Case à cocher - Checkbox
              </Link>
              <Link current={is('/composants/tab')} href="/composants/tab">
                Onglet - Tab
              </Link>
              <Link current={is('/composants/tag')} href="/composants/tag">
                Tag - Tag
              </Link>
            </SideMenuItem>
          </SideMenu>
        </Col>
        <Col xs={12} md={8} className="fr-pt-6w">
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

