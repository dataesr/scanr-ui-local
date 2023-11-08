import PropTypes from 'prop-types';
import {
  Badge,
  Header as HeaderWrapper,
  HeaderBody,
  Logo,
  Service,
  Tool,
  ToolItemGroup,
} from '@dataesr/react-dsfr';

const {
  VITE_APP_NAME,
  VITE_HEADER_TAG,
  VITE_HEADER_TAG_COLOR,
  VITE_MINISTER_NAME,
  VITE_DESCRIPTION,
} = import.meta.env;

export default function Header({ switchTheme }) {
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
      {/* <HeaderNav path={pathname}>
          <NavItem
            title={<FormattedMessage id="app.layout.header.nav.home" />}
            asLink={<RouterLink to="/" />}
            current={pathname === '/'}
          />
          <NavItem
            title={<FormattedMessage id="app.layout.header.nav.search" />}
            asLink={<RouterLink to="/search" />}
            current={pathname.startsWith('/search')}
          />
          <NavItem
            title={<FormattedMessage id="app.layout.header.nav.focus" />}
            asLink={<RouterLink to="/focus" />}
            current={pathname === '/focus'}
          />
          <NavItem
            title="A propos"
            current={aboutPath.includes(pathname.split('/')?.[1])}
          >
            <NavSubItem
              asLink={<RouterLink to="/faq" />}
              title={<FormattedMessage id="app.layout.header.nav.faq" />}
              current={pathname === '/faq'}
            />
            <NavSubItem
              asLink={<RouterLink to="/team" />}
              title={<FormattedMessage id="app.layout.header.nav.team" />}
              current={pathname === '/team'}
            />
            <NavSubItem
              asLink={<RouterLink to="/sources" />}
              title={<FormattedMessage id="app.layout.header.nav.sources" />}
              current={pathname === '/sources'}
            />
            <NavSubItem
              asLink={<RouterLink to="/tutorial" />}
              title={<FormattedMessage id="app.layout.header.nav.tutorial" />}
              current={pathname === '/tutorial'}
            />
            <NavSubItem
              asLink={<RouterLink to="/opendata" />}
              title={<FormattedMessage id="app.layout.header.nav.opendata" />}
              current={pathname === '/opendata'}
            />
            <NavSubItem
              asLink={<RouterLink to="/press" />}
              title={<FormattedMessage id="app.layout.header.nav.press" />}
              current={pathname === '/press'}
            />
          </NavItem>
        </HeaderNav> */}
    </HeaderWrapper>
  );
}

Header.propTypes = {
  switchTheme: PropTypes.shape({
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
  }).isRequired,
};
