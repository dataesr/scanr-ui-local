import { Outlet } from 'react-router-dom';
import { Container, useDSFRConfig } from '@dataesr/dsfr-plus';
import Header from './Header';
import MainFooter from './Footer';
import { IntlProvider } from 'react-intl';
import messagesFr from "./locales/fr.json";
import messagesEn from "./locales/en.json";
import Consent from './consent';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};


// import ScrollToTop from '../components/scroll-top';

export default function Layout() {
  const { locale } = useDSFRConfig();
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Consent />
      <Header />
      <Container as="main" role="main" fluid>
        <Outlet />
      </Container>
      <MainFooter />
    </IntlProvider>
  );
}
