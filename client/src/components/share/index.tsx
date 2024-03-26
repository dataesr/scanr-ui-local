import { Link, useDSFRConfig } from "@dataesr/dsfr-plus";
import useConsent from "../../hooks/useConsent";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { RawIntlProvider, createIntl } from "react-intl";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


export default function Share() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const url = window.location.href;
  const { consent, dialogId } = useConsent();
  const { copy } = useCopyToClipboard();
  const { facebook, twitter, linkedin } = consent;

  const mailtoLink = `mailto:?subject=Visitez la page sur scanR&body=${encodeURIComponent(
    url
  )}`;

  const formating = {
    authorize: (chunks: any) => (
      <Link
        role="button"
        href={null}
        data-fr-opened="false"
        aria-controls={dialogId}
        title={intl.formatMessage({ id: "share.cookies" })}
      >
        {chunks}
      </Link>
    ),
  };

  const onClickFacebook = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    window.open(
      "https://www.facebook.com/sharer.php",
      intl.formatMessage({ id: "share.facebook" }),
      "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
    );
  };

  const onClickTwitter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const currentURL = window.location.href;
    const text = "#dataEsr #scanR";
    const twitterShareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentURL
    )}&text=${encodeURIComponent(text)}`;

    window.open(
      twitterShareURL,
      intl.formatMessage({ id: "share.twitter" }),
      "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420"
    );
  };

  const onClickLinkedin = (e) => {
    e.preventDefault();
    const currentURL = encodeURIComponent("www.google.fr");
    const text = "#dataEsr #scanR";
    const linkedinShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}&text=${encodeURIComponent(
      text
    )}`;
    window.open(
      linkedinShareURL,
      intl.formatMessage({ id: "share.linkedin" }),
      "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420"
    );
  };

  return (
    <RawIntlProvider value={intl}>
      <div className="fr-share">
        {(!twitter || !facebook || !linkedin) && (
          <p className="fr-share__text">
            {intl.formatMessage({ id: "share.cookies.personalize" }, formating)}
          </p>
        )}
        <ul className="fr-share__group">
          <li>
            <a
              className="fr-share__link fr-share__link--facebook"
              title={`${intl.formatMessage({ id: "share.facebook" })} ${!facebook ? intl.formatMessage({ id: "share.inactive" }) : ''}`}
              role="link"
              aria-disabled={!facebook}
              onClick={onClickFacebook}
              href={
                facebook
                  ? `https://www.facebook.com/sharer.php?u=${url}`
                  : undefined
              }
            >
              {intl.formatMessage({ id: "share.facebook" })}
            </a>
          </li>
          <li>
            <a
              className="fr-share__link fr-share__link--twitter"
              title={`${intl.formatMessage({ id: "share.twitter" })} ${!facebook ? intl.formatMessage({ id: "share.inactive" }) : ''}`}
              role="link"
              aria-disabled={!twitter}
              onClick={onClickTwitter}
              href={
                twitter
                  ? `https://twitter.com/intent/tweet?url=${url}`
                  : undefined
              }
            >
              {intl.formatMessage({ id: "share.twitter" })}
            </a>
          </li>
          <li>
            <a
              className="fr-share__link fr-share__link--linkedin"
              title={`${intl.formatMessage({ id: "share.linkedin" })} ${!facebook ? intl.formatMessage({ id: "share.inactive" }) : ''}`}
              role="link"
              aria-disabled={!linkedin}
              onClick={onClickLinkedin}
              href={
                linkedin
                  ? `https://www.linkedin.com/shareArticle?url=${url}`
                  : undefined
              }
            >
              {intl.formatMessage({ id: "share.linkedin" })}
            </a>
          </li>
          <li>
            <a
              className="fr-share__link fr-share__link--mail"
              href={mailtoLink}
              title={intl.formatMessage({ id: "share.email" })}
              target="_blank"
              rel="noreferrer"
            >
              {intl.formatMessage({ id: "share.email" })}
            </a>
          </li>
          <li>
            <button
              className="fr-share__link fr-share__link--copy"
              title={intl.formatMessage({ id: "share.copy" })}
              onClick={() => copy(url)}
            >
              {intl.formatMessage({ id: "share.copy" })}
            </button>
          </li>
        </ul>
      </div>
    </RawIntlProvider>
  );
}
