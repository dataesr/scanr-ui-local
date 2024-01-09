import { Button, Header, Logo, Service, FastAccess } from '@dataesr/react-dsfr';
import { Outlet } from 'react-router-dom';

export function Layout() {

  return (
    <>
      <Header>
        <Logo text="Ministère de | l'enseignement supérieur | et de la recherche" />
        <Service name="React DSFR" tagline="Une bibliothèque de composants React" />
        <FastAccess>
          <Button as="a" href="https://github.com/dataesr/react-dsfr" target="_blank" rel="noreferer noopener" icon="github-fill" size="sm" variant="text">Github</Button>
          <Button as="a" href="https://www.systeme-de-design.gouv.fr" target="_blank" rel="noreferer noopener" icon="code-s-slash-line" size="sm" variant="text">Système de design de l'état</Button>
        </FastAccess>
      </Header>
      <Outlet />
    </>
  )
}

