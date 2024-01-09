import { Link, Logo } from '@dataesr/dsfr-plus';
import { Footer, FooterBody, FooterBottom } from "../components/footer";
import { FormattedMessage, useIntl } from 'react-intl';
import SwitchTheme from '../components/switch-theme';

export default function MainFooter() {
  const intl = useIntl()
  return (
    <Footer>
      <FooterBody description={intl.formatMessage({ id: "layout.footer.tagline" })}>
        <Logo splitCharacter='|' text="Ministère|de l'enseignement|supérieur|et de la recherche" />
        <Link
          className="fr-footer__content-link"
          target="_blank"
          rel="noreferrer noopener external"
          title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
          href="https://legifrance.gouv.fr"
        >
          legifrance.gouv.fr
        </Link>
        <Link
          className="fr-footer__content-link"
          target="_blank"
          rel="noreferrer noopener external"
          title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
          href="https://gouvernement.fr"
        >
          gouvernement.fr
        </Link>
        <Link
          className="fr-footer__content-link"
          target="_blank"
          rel="noreferrer noopener external"
          title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
          href="https://service-public.fr"
        >
          service-public.fr
        </Link>
        <Link
          className="fr-footer__content-link"
          target="_blank"
          rel="noreferrer noopener external"
          title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
          href="https://data.gouv.fr"
        >
          data.gouv.fr
        </Link>
      </FooterBody>
      <FooterBottom copy={intl.formatMessage({ id: "layout.footer.tagline" })}>
        <Link className="fr-footer__bottom-link" href="#">
          <FormattedMessage id="layout.footer.legal-notice" />
        </Link>
        <Link className="fr-footer__bottom-link" href="#">
          <FormattedMessage id="layout.footer.personal-data" />
        </Link>
        <Link className="fr-footer__bottom-link" href="#">
          <FormattedMessage id="layout.footer.cookies" />
        </Link>
        <Link className="fr-footer__bottom-link" href="#">
          <FormattedMessage id="layout.footer.accessibility" />
        </Link>
        <Link className="fr-footer__bottom-link" href="#">
          <FormattedMessage id="layout.footer.help" />
        </Link>
        <button className="fr-footer__bottom-link" data-fr-opened="false" aria-controls="fr-consent-modal">
          <FormattedMessage id="layout.cookies" />
        </button>
        <button className="fr-footer__bottom-link fr-icon-theme-fill fr-btn--icon-left" aria-controls="fr-theme-modal" data-fr-opened="false">
          <FormattedMessage id="layout.switch-theme" />
        </button>
      </FooterBottom>
      <SwitchTheme />
    </Footer >
  )
}

