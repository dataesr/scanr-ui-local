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
  Autocomplete,
  AutocompleteItem,
  useAutocompleteList,
  useDSFRConfig,
} from '@dataesr/dsfr-plus';
import { FormattedMessage, useIntl } from 'react-intl';
import SwitchLanguage from '../components/switch-language';
import { autocompleteOrganizations } from '../api/organizations/autocomplete';
import { LightOrganization } from '../types/organization';
import getLangFieldValue from '../utils/lang';

const languages = [
  { shortName: 'FR', fullName: 'Français', key: 'fr' },
  { shortName: 'EN', fullName: 'English', key: 'en' },
  { shortName: 'DE', fullName: 'Deutsch', key: 'de' },
  { shortName: 'ES', fullName: 'Español', key: 'es' },
];

export default function Header() {
  const { locale } = useDSFRConfig();
  const { pathname } = useLocation();
  const intl = useIntl();

  const authorsAutocompletedList = useAutocompleteList<LightOrganization>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] };
      }
      const res = await autocompleteOrganizations({ query: filterText })
      return { items: res.data?.map((org) => org._source) };
    }
  });

  return (
    <HeaderWrapper>
      <Logo splitCharacter='|' text="Ministère|de l'enseignement|supérieur|et de la recherche" />
      <Service name="scanR" tagline={intl.formatMessage({ id: "layout.header.tagline" })} />
      <FastAccess>
        <Button className="fr-btn fr-icon-theme-fill" aria-controls="fr-theme-modal" data-fr-opened="false">
          {intl.formatMessage({ id: "layout.switch-theme" })}
        </Button>
        <SwitchLanguage languages={languages} />
      </FastAccess>
      <Autocomplete
        label="Rechercher des structures"
        items={authorsAutocompletedList.items}
        inputValue={authorsAutocompletedList.filterText}
        onInputChange={authorsAutocompletedList.setFilterText}
        loadingState={authorsAutocompletedList.loadingState}
        placeholder="Recherche rapide"
        // menuTrigger="focus"
        size="md"
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-building-line" />}
            description={item.address?.find((a) => a.main).city}
            key={item.id}
            href={`/organizations/${item.id}`}
          >
            <span className="fr-text--sm">
              {getLangFieldValue(locale)(item.label)}
            </span>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Nav>
        <Link current={pathname === "/"} href='/'><FormattedMessage id="layout.header.nav.home" /></Link>
        <NavItem
          current={pathname.split('/').includes('search')}
          title={intl.formatMessage({ id: "layout.header.nav.search" })}
        >
          <Link current={pathname.split('/').includes('organizations')} href="/search/organizations">
            <FormattedMessage id="layout.header.nav.search.organizations" />
          </Link>
          <Link current={pathname.split('/').includes('authors')} href="/search/authors">
            <FormattedMessage id="layout.header.nav.search.authors" />
          </Link>
          <Link current={pathname.split('/').includes('projects')} href="/search/projects">
            <FormattedMessage id="layout.header.nav.search.projects" />
          </Link>
          <Link current={pathname.split('/').includes('publications')} href="/search/publications">
            <FormattedMessage id="layout.header.nav.search.publications" />
          </Link>
          <Link current={pathname.split('/').includes('patents')} href="/search/patents">
            <FormattedMessage id="layout.header.nav.search.patents" />
          </Link>
        </NavItem>
        <Link current={pathname.startsWith('/networks')} href="/networks">
          {intl.formatMessage({ id: "layout.header.nav.networks" })}
        </Link>
      </Nav>
    </HeaderWrapper >
  );
}
