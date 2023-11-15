import PropTypes from 'prop-types';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Badge,
  Header as HeaderWrapper,
  HeaderBody,
  Logo,
  Service,
  Tool,
  ToolItemGroup,
  HeaderNav,
  NavItem,
  NavSubItem,
} from '@dataesr/react-dsfr';

const {
  VITE_APP_NAME,
  VITE_HEADER_TAG,
  VITE_HEADER_TAG_COLOR,
  VITE_MINISTER_NAME,
  VITE_DESCRIPTION,
} = import.meta.env;

export default function Header({ switchTheme }) {
  const { pathname } = useLocation();
  const { isOpen, setIsOpen } = switchTheme;

  return (
    <HeaderWrapper>
      <HeaderBody>
        <Logo splitCharacter={9}>
          {VITE_MINISTER_NAME}
        </Logo>
        <Service
          title={(
            <>
              {VITE_APP_NAME}
              {VITE_HEADER_TAG && (
                <Badge
                  text={VITE_HEADER_TAG}
                  color={(!VITE_HEADER_TAG_COLOR) ? 'info' : undefined}
                  isSmall
                  colorFamily={VITE_HEADER_TAG_COLOR}
                />
              )}
            </>
          )}
          description={VITE_DESCRIPTION}
        />
        <Tool closeButtonLabel="fermer" className="extend">
          <ToolItemGroup>
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="fr-footer__bottom-link fr-fi-theme-fill fr-link--icon-left"
              aria-controls="fr-theme-modal"
              data-fr-opened={isOpen}
            >
              Paramètres d'affichage
            </button>
          </ToolItemGroup>
        </Tool>
      </HeaderBody>
      <HeaderNav path={pathname}>
        <NavItem
          title="Accueil"
          asLink={<RouterLink to="/" />}
          current={pathname === '/'}
        />
        <NavItem
          title="Rechercher"
          current={pathname.startsWith('/search')}
        >
          <NavSubItem
            title="Structures"
            asLink={<RouterLink to="/search/organizations" />}
            current={pathname.split('/').includes('organizations')}
          />
          <NavSubItem
            title="Auteurs"
            asLink={<RouterLink to="/search/authors" />}
            current={pathname.split('/').includes('authors')}
          />
          <NavSubItem
            title="Financements"
            asLink={<RouterLink to="/search/projects" />}
            current={pathname.split('/').includes('projects')}
          />
          <NavSubItem
            title="Publications"
            asLink={<RouterLink to="/search/publications" />}
            current={pathname.split('/').includes('publications')}
          />
          <NavSubItem
            title="Brevets"
            asLink={<RouterLink to="/search/patents" />}
            current={pathname.split('/').includes('patents')}
          />
        </NavItem>
        <NavItem
          title="Focus sur..."
          asLink={<RouterLink to="/focus" />}
          current={pathname === '/focus'}
        />
        <NavItem
          title="A propos"
          current={pathname.startsWith('/about')}
        >
          <NavSubItem
            title="FAQ"
            asLink={<RouterLink to="/about/faq" />}
            current={pathname === '/about/faq'}
          />
          <NavSubItem
            title="L'équipe"
            asLink={<RouterLink to="/about/team" />}
            current={pathname === '/about/team'}
          />
        </NavItem>
      </HeaderNav>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  switchTheme: PropTypes.shape({
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
  }).isRequired,
};
