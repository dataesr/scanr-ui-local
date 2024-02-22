import { Link, Logo } from "@dataesr/dsfr-plus";
import { Footer, FooterBody, FooterBottom } from "../components/footer";
import { useIntl } from "react-intl";
import SwitchTheme from "../components/switch-theme";
import useConsent from "../hooks/useConsent";

export default function MainFooter() {
  const intl = useIntl();
  const { dialogId } = useConsent();
  return (
    <Footer>
      <FooterBody
        description={intl.formatMessage({ id: "layout.footer.tagline" })}
      >
        <Logo
          splitCharacter="|"
          text="Ministère|de l'enseignement|supérieur|et de la recherche"
        />
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
      <FooterBottom>
        <Link className="fr-footer__bottom-link" href="#">
          {intl.formatMessage({
            id: "layout.footer.legal-notice",
          })}
        </Link>
        <Link className="fr-footer__bottom-link" href="#">
          {intl.formatMessage({
            id: "layout.footer.personal-data",
          })}
        </Link>
        <Link className="fr-footer__bottom-link" href="#">
          {intl.formatMessage({
            id: "layout.footer.accessibility",
          })}
        </Link>
        <button
          className="fr-footer__bottom-link"
          data-fr-opened="false"
          aria-controls={dialogId}
        >
          {intl.formatMessage({
            id: "layout.footer.cookies",
          })}
        </button>
        <button
          className="fr-footer__bottom-link fr-icon-theme-fill fr-btn--icon-left"
          aria-controls="fr-theme-modal"
          data-fr-opened="false"
        >
          {intl.formatMessage({
            id: "layout.footer.switch-theme",
          })}
        </button>
      </FooterBottom>
      <SwitchTheme />
    </Footer>
  );
}
