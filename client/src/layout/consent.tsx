import useConsent from "../hooks/useConsent";

export default function Consent() {
  const { dialogId, consent, setConsent, set } = useConsent({ twitter: 0, matomo: 0, youtube: 0, facebook: 0, linkedin: 0 });

  return (
    <>
      {!set && <div className="fr-consent-banner">
        <h2 className="fr-h6">À propos des cookies sur scanr.enseignementsup-recherche.gouv.fr</h2>
        <div className="fr-consent-banner__content">
          <p className="fr-text--sm">Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page <a href="">Données personnelles et cookies</a>. Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer.</p>
        </div>
        <ul className="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
          <li>
            <button
              className="fr-btn"
              title="Autoriser tous les cookies"
              onClick={() => setConsent({ twitter: 1, matomo: 1, youtube: 1, facebook: 1, linkedin: 1 })}
            >
              Tout accepter
            </button>
          </li>
          <li>
            <button
              className="fr-btn"
              title="Refuser tous les cookies"
              onClick={() => setConsent({ twitter: 0, matomo: 0, youtube: 0, facebook: 0, linkedin: 0 })}
            >
              Tout refuser
            </button>
          </li>
          <li>
            <button
              className="fr-btn fr-btn--secondary"
              data-fr-opened="false"
              aria-controls={dialogId}
              title="Personnaliser les cookies"
            >
              Personnaliser
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
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-consent-modal-title" className="fr-modal__title">
                    Panneau de gestion des cookies
                  </h1>
                  <div className="fr-consent-manager">
                    <div className="fr-consent-service fr-consent-manager__header">
                      <fieldset className="fr-fieldset fr-fieldset--inline">
                        <legend id="finality-legend" className="fr-consent-service__title">Préférences pour tous les services. <a href="">Données personnelles et cookies</a>
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
                              Tout accepter
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
                              Tout refuser
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="fr-consent-service">
                      <fieldset aria-labelledby="finality-1-legend finality-1-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                        <legend id="finality-1-legend" className="fr-consent-service__title">Statistique</legend>
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
                              Accepter
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
                              Refuser
                            </label>
                          </div>
                        </div>
                        <p id="finality-1-desc" className="fr-consent-service__desc">
                          Les cookies statistiques aident, par la collecte d'informations anonymisées, à comprendre comment les visiteurs interagissent avec scanR.
                        </p>
                      </fieldset>
                    </div>
                    <div className="fr-consent-service">
                      <fieldset aria-labelledby="share-legend share-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                        <legend id="share-legend" className="fr-consent-service__title">Partage</legend>
                        <div className="fr-consent-service__radios">
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-share-accept"
                              name="consent-share"
                              checked={!!consent.facebook && !!consent.linkedin && !!consent.twitter}
                              onChange={() => {
                                consent.facebook = 1;
                                consent.linkedin = 1;
                                consent.twitter = 1;
                              }}
                            />
                            <label className="fr-label" htmlFor="consent-share-accept">
                              Accepter
                            </label>
                          </div>
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id="consent-share-refuse"
                              name="consent-share"
                              checked={!consent.facebook && !consent.linkedin && !consent.twitter}
                              onChange={() => {
                                consent.facebook = 0;
                                consent.linkedin = 0;
                                consent.twitter = 0;

                              }}
                            />
                            <label className="fr-label" htmlFor="consent-share-refuse">
                              Refuser
                            </label>
                          </div>
                        </div>
                        <p id="share-desc" className="fr-consent-service__desc">
                          Afin de pouvoir partager les pages de scanR, il est nécessaire d'accepter les cookies de partage des réseaux sociaux.
                        </p>
                        <div className="fr-consent-service__collapse">
                          <button className="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="share-legend" aria-controls="share-collapse"> Voir plus de détails</button>
                        </div>
                        <div className="fr-consent-services fr-collapse" id="share-collapse">
                          <div className="fr-consent-service">
                            <fieldset className="fr-fieldset fr-fieldset--inline">
                              <legend id="share-facebook-legend" className="fr-consent-service__title">Facebook</legend>
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
                                    Accepter
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
                                    Refuser
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
                                    Accepter
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
                                    Refuser
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
                                    Accepter
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
                                    Refuser
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
                          onClick={() => {
                            setConsent(consent)
                            const element = document.getElementById(dialogId)
                            // @ts-expect-error dsfr does not have types
                            window.dsfr(element).modal.conceal()
                          }}
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
    </>
  )
}