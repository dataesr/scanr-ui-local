import { useLocation } from 'react-router-dom';
import {
  Header as HeaderWrapper,
  Logo,
  Service,
  NavItem,
  Link,
  Nav,
  FastAccess,
  Button,
} from '@dataesr/dsfr-plus';
import { FormattedMessage, useIntl } from 'react-intl';
import SwitchLanguage from '../components/switch-language';

const languages = [
  { shortName: 'FR', fullName: 'Français', key: 'fr' },
  { shortName: 'EN', fullName: 'English', key: 'en' },
];

export default function Header() {
  const { pathname } = useLocation();
  const intl = useIntl();

  return (
    <HeaderWrapper>
      <Logo splitCharacter='|' text="Ministère|de l'enseignement|supérieur|et de la recherche" />
      <Service name="scanR" tagline={intl.formatMessage({ id: "layout.header.tagline" })} />
      <FastAccess>
        <Button className="fr-btn fr-icon-theme-fill" aria-controls="fr-theme-modal" data-fr-opened="false">{intl.formatMessage({ id: "layout.switch-theme" })}</Button>
        <SwitchLanguage languages={languages} />
      </FastAccess>
      <Nav>
        <Link current={pathname === "/"} href='/'><FormattedMessage id="layout.header.nav.home" /></Link>
        <NavItem
          current={pathname.split('/').includes('search')}
          title={intl.formatMessage({ id: "layout.header.nav.search" })}
        >
          <Link current={pathname.split('/').includes('organizations')} href="/search/organizations">
            <FormattedMessage id="layout.header.nav.search.organizations" />
          </Link>
          <Link current={pathname.split('/').includes('publications')} href="/search/publications">
            <FormattedMessage id="layout.header.nav.search.publications" />
          </Link>
          <Link current={pathname.split('/').includes('projects')} href="/search/projects">
            <FormattedMessage id="layout.header.nav.search.projects" />
          </Link>
          <Link current={pathname.split('/').includes('authors')} href="/search/authors">
            <FormattedMessage id="layout.header.nav.search.authors" />
          </Link>
          <Link current={pathname.split('/').includes('patents')} href="/search/patents">
            <FormattedMessage id="layout.header.nav.search.patents" />
          </Link>
        </NavItem>
        <NavItem
          current={pathname.startsWith('/about')}
          title={intl.formatMessage({ id: "layout.header.nav.about" })}
        >
          <Link current={pathname === "/about/faq"} href="/about/faq">
            <FormattedMessage id="layout.header.nav.about.faq" />
          </Link>
          <Link current={pathname === "/about/team"} href="/about/team">
            <FormattedMessage id="layout.header.nav.about.team" />
          </Link>
        </NavItem>
      </Nav>
    </HeaderWrapper>
  );
}
