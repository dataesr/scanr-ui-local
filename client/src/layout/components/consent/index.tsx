import { RawIntlProvider, createIntl } from "react-intl";
import useConsent from "../../../hooks/useConsent";
import { useDSFRConfig } from "@dataesr/dsfr-plus";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

export default function Consent() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { dialogId, consent, setConsent, set } = useConsent({ twitter: 0, matomo: 0, youtube: 0, facebook: 0, linkedin: 0 });

  return (
    <RawIntlProvider value={intl}>
      {!set && <div className="fr-consent-banner">
        <h2 className="fr-h6">
          {intl.formatMessage({ id: "layout.consent.title" })}
        </h2>
        <div className="fr-consent-banner__content">
          <p className="fr-text--sm">
            {intl.formatMessage({ id: "layout.consent.content" })}
          </p>
        </div>
        <ul className="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
          <li>
            <button
              className="fr-btn"
              title="Autoriser tous les cookies"
              onClick={() => setConsent({ twitter: 1, matomo: 1, youtube: 1, facebook: 1, linkedin: 1 })}
            >
              {intl.formatMessage({ id: "layout.consent.accept-all" })}
            </button>
          </li>
          <li>
            <button
              className="fr-btn"
              title="Refuser tous les cookies"
              onClick={() => setConsent({ twitter: 0, matomo: 0, youtube: 0, facebook: 0, linkedin: 0 })}
            >
              {intl.formatMessage({ id: "layout.consent.refuse-all" })}
            </button>
          </li>
          <li>
            <button
              className="fr-btn fr-btn--secondary"
              data-fr-opened="false"
              aria-controls={dialogId}
              title="Personnaliser les cookies"
            >
              {intl.formatMessage({ id: "layout.consent.customize" })}
            </button>
          </li>
        </ul>

      </div>}
      <dialog id={dialogId} className="fr-modal" role="dialog" aria-labelledby="fr-consent-modal-title">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-btn--close fr-btn" aria-controls={dialogId} title="Fermer">
                    {intl.formatMessage({ id: "layout.consent.cookies.close" })}
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-consent-modal-title" className="fr-modal__title">
                    {intl.formatMessage({ id: "layout.consent.cookies" })}
                  </h1>
                  <div className="fr-consent-manager">
                    <div className="fr-consent-service fr-consent-manager__header">
                      <fieldset className="fr-fieldset fr-fieldset--inline">
                        <legend id="finality-legend" className="fr-consent-service__title">
                          {intl.formatMessage({ id: "layout.consent.cookies.preferences" })}
                        </legend>
                        <div className="fr-consent-service__radios">
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-all-accept"
                              name="consent-all"
                              checked={!!consent.twitter && !!consent.matomo && !!consent.youtube && !!consent.facebook && !!consent.linkedin}
                              onChange={() => {
                                consent.twitter = 1;
                                consent.matomo = 1;
                                consent.youtube = 1;
                                consent.facebook = 1;
                                consent.linkedin = 1;
                              }}
                            />
                            <label className="fr-label" htmlFor="consent-all-accept">
                              {intl.formatMessage({ id: "layout.consent.accept-all" })}
                            </label>
                          </div>
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-all-refuse"
                              name="consent-all"
                              checked={!consent.twitter && !consent.matomo && !consent.youtube && !consent.facebook && !consent.linkedin}
                              onChange={() => {
                                consent.twitter = 0;
                                consent.matomo = 0;
                                consent.youtube = 0;
                                consent.facebook = 0;
                                consent.linkedin = 0;
                              }}
                            />
                            <label className="fr-label" htmlFor="consent-all-refuse">
                              {intl.formatMessage({ id: "layout.consent.refuse-all" })}
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    {/* <div className="fr-consent-service">
                      <fieldset aria-labelledby="finality-1-legend finality-1-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                        <legend id="finality-1-legend" className="fr-consent-service__title">
                          {intl.formatMessage({ id: "layout.consent.cookies.finality.stats" })}
                        </legend>
                        <div className="fr-consent-service__radios">
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-finality-1-accept"
                              name="consent-finality-1"
                              checked={!!consent.matomo}
                              onChange={() => { consent.matomo = 1 }}
                            />
                            <label className="fr-label" htmlFor="consent-finality-1-accept">
                              {intl.formatMessage({ id: "layout.consent.cookies.accept" })}
                            </label>
                          </div>
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-finality-1-refuse"
                              name="consent-finality-1"
                              checked={!consent.matomo}
                              onChange={() => { consent.matomo = 0 }}
                            />
                            <label className="fr-label" htmlFor="consent-finality-1-refuse">
                              {intl.formatMessage({ id: "layout.consent.cookies.refuse" })}
                            </label>
                          </div>
                        </div>
                        <p id="finality-1-desc" className="fr-consent-service__desc">
                          {intl.formatMessage({ id: "layout.consent.cookies.finality.stats.desc" })}
                        </p>
                      </fieldset>
                    </div> */}
                    <div className="fr-consent-service">
                      <fieldset aria-labelledby="share-legend share-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                        <legend id="share-legend" className="fr-consent-service__title">
                          {intl.formatMessage({ id: "layout.consent.cookies.finality.share" })}
                        </legend>
                        <div className="fr-consent-service__radios">
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-share-accept"
                              name="consent-share"
                              checked={!!consent.facebook && !!consent.linkedin && !!consent.twitter && !!consent.youtube}
                              onChange={() => {
                                consent.facebook = 1;
                                consent.linkedin = 1;
                                consent.twitter = 1;
                                consent.youtube = 1;
                              }}
                            />
                            <label className="fr-label" htmlFor="consent-share-accept">
                              {intl.formatMessage({ id: "layout.consent.cookies.accept" })}
                            </label>
                          </div>
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-share-refuse"
                              name="consent-share"
                              checked={!consent.facebook && !consent.linkedin && !consent.twitter && !consent.youtube}
                              onChange={() => {
                                consent.facebook = 0;
                                consent.linkedin = 0;
                                consent.twitter = 0;
                                consent.youtube = 0;
                              }}
                            />
                            <label className="fr-label" htmlFor="consent-share-refuse">
                              {intl.formatMessage({ id: "layout.consent.cookies.refuse" })}
                            </label>
                          </div>
                        </div>
                        <p id="share-desc" className="fr-consent-service__desc">
                          {intl.formatMessage({ id: "layout.consent.cookies.finality.share.desc" })}
                        </p>
                        <div className="fr-consent-service__collapse">
                          <button className="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="share-legend" aria-controls="share-collapse">
                            {intl.formatMessage({ id: "layout.consent.cookies.finality.toggle" })}
                          </button>
                        </div>
                        <div className="fr-consent-services fr-collapse" id="share-collapse">
                          <div className="fr-consent-service">
                            <fieldset className="fr-fieldset fr-fieldset--inline">
                              <legend id="share-youtube-legend" className="fr-consent-service__title">
                                Youtube
                              </legend>
                              <div className="fr-consent-service__radios fr-fieldset--inline">
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-youtube-accept"
                                    name="consent-share-youtube"
                                    checked={!!consent.youtube}
                                    onChange={() => { consent.youtube = 1 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-youtube-accept">
                                    {intl.formatMessage({ id: "layout.consent.cookies.accept" })}
                                  </label>
                                </div>
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-youtube-refuse"
                                    name="consent-share-youtube"
                                    checked={!consent.youtube}
                                    onChange={() => { consent.youtube = 0 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-youtube-refuse">
                                    {intl.formatMessage({ id: "layout.consent.cookies.refuse" })}
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div className="fr-consent-service">
                            <fieldset className="fr-fieldset fr-fieldset--inline">
                              <legend id="share-facebook-legend" className="fr-consent-service__title">
                                Facebook
                              </legend>
                              <div className="fr-consent-service__radios fr-fieldset--inline">
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-facebook-accept"
                                    name="consent-share-facebook"
                                    checked={!!consent.facebook}
                                    onChange={() => { consent.facebook = 1 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-facebook-accept">
                                    {intl.formatMessage({ id: "layout.consent.cookies.accept" })}
                                  </label>
                                </div>
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-facebook-refuse"
                                    name="consent-share-facebook"
                                    checked={!consent.facebook}
                                    onChange={() => { consent.facebook = 0 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-facebook-refuse">
                                    {intl.formatMessage({ id: "layout.consent.cookies.refuse" })}
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div className="fr-consent-service">
                            <fieldset aria-labelledby="share-twitter-legend share-twitter-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                              <legend id="share-twitter-legend" className="fr-consent-service__title" aria-describedby="share-twitter-desc">
                                Twitter (X)
                              </legend>
                              <div className="fr-consent-service__radios fr-fieldset--inline">
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-twitter-accept"
                                    name="consent-share-twitter"
                                    checked={!!consent.twitter}
                                    onChange={() => { consent.twitter = 1 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-twitter-accept">
                                    {intl.formatMessage({ id: "layout.consent.cookies.accept" })}
                                  </label>
                                </div>
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-twitter-refuse"
                                    name="consent-share-twitter"
                                    checked={!consent.twitter}
                                    onChange={() => { consent.twitter = 0 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-twitter-refuse">
                                    {intl.formatMessage({ id: "layout.consent.cookies.refuse" })}
                                  </label>
                                </div>
                              </div>
                              {/* <p id="share-twitter-desc" className="fr-consent-service__desc">Ce service utilise 3 cookies.</p> */}
                            </fieldset>
                          </div>
                          <div className="fr-consent-service">
                            <fieldset className="fr-fieldset fr-fieldset--inline">
                              <legend id="share-linkedin-legend" className="fr-consent-service__title">LinkedIn</legend>
                              <div className="fr-consent-service__radios fr-fieldset--inline">
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-linkedin-accept"
                                    name="consent-share-linkedin"
                                    checked={!!consent.linkedin}
                                    onChange={() => { consent.linkedin = 1 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-linkedin-accept">
                                    {intl.formatMessage({ id: "layout.consent.cookies.accept" })}
                                  </label>
                                </div>
                                <div className="fr-radio-group">
                                  <input
                                    type="radio"
                                    id="consent-share-linkedin-refuse"
                                    name="consent-share-linkedin"
                                    checked={!consent.linkedin}
                                    onChange={() => { consent.linkedin = 0 }}
                                  />
                                  <label className="fr-label" htmlFor="consent-share-linkedin-refuse">
                                    {intl.formatMessage({ id: "layout.consent.cookies.refuse" })}
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <ul className="fr-consent-manager__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-sm">
                      <li>
                        <button
                          className="fr-btn"
                          aria-controls={dialogId}
                          onClick={() => setConsent(consent)}
                        >
                          Confirmer mes choix
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </RawIntlProvider>
  )
}
