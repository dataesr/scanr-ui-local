import { SideMenu, SideMenuItem, Link, Container, Row, Col } from '@dataesr/dsfr-plus';
import { Outlet, useLocation } from 'react-router-dom';


export function DocsLayout() {
  const { pathname } = useLocation();
  if (!pathname) return null;

  const is = (str: string): boolean => pathname?.startsWith(`/docs/${str}`)
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <SideMenu title="" sticky fullHeight className="padded-sidemenu">
            <Link current={is('overview')} href="/docs/overview">Overview</Link>
            <Link current={is('quick-start')} href="/docs/quick-start">Quick start</Link>
            <SideMenuItem defaultExpanded={is('objects')} title="Models">
              <Link current={is('objects/publications')} href="/docs/objects/publications">
                Publications
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