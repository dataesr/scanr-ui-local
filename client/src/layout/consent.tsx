import { useState } from "react";

export default function Consent() {
  const [consent, setConcent] = useState<string | undefined>(localStorage.getItem('consent'));
  const setConsent = (value) => {
    localStorage.setItem('consent', value);
    setConcent(localStorage.getItem('consent'));
  }


  return (
    <>
      {!consent && <div className="fr-consent-banner">
        <h2 className="fr-h6">À propos des cookies sur scanr.enseignementsup-recherche.gouv.fr</h2>
        <div className="fr-consent-banner__content">
          <p className="fr-text--sm">Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page <a href="">Données personnelles et cookies</a>. Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer.</p>
        </div>
        <ul className="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
          <li>
            <button className="fr-btn" title="Autoriser tous les cookies" onClick={() => setConsent('all')}>
              Tout accepter
            </button>
          </li>
          <li>
            <button className="fr-btn" title="Refuser tous les cookies" onClick={() => setConsent('none')}>
              Tout refuser
            </button>
          </li>
          <li>
            <button className="fr-btn fr-btn--secondary" data-fr-opened="false" aria-controls="fr-consent-modal" title="Personnaliser les cookies">
              Personnaliser
            </button>
          </li>
        </ul>

      </div>}
      <dialog id="fr-consent-modal" className="fr-modal" role="dialog" aria-labelledby="fr-consent-modal-title">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-btn--close fr-btn" aria-controls="fr-consent-modal" title="Fermer">
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
                            <input type="radio" id="consent-all-accept" name="consent-all" />
                            <label className="fr-label" htmlFor="consent-all-accept">
                              Tout accepter
                            </label>
                          </div>
                          <div className="fr-radio-group">
                            <input type="radio" id="consent-all-refuse" name="consent-all" />
                            <label className="fr-label" htmlFor="consent-all-refuse">
                              Tout refuser
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="fr-consent-service">
                      <fieldset aria-labelledby="finality-0-legend finality-0-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                        <legend id="finality-0-legend" className="fr-consent-service__title">Cookies obligatoires</legend>
                        <div className="fr-consent-service__radios">
                          <div className="fr-radio-group">
                            <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
                            <label className="fr-label" htmlFor="consent-finality-0-accept">
                              Accepter
                            </label>
                          </div>
                          <div className="fr-radio-group">
                            <input disabled type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
                            <label className="fr-label" htmlFor="consent-finality-0-refuse">
                              Refuser
                            </label>
                          </div>
                        </div>
                        <p id="finality-0-desc" className="fr-consent-service__desc">Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être désactivés.</p>
                      </fieldset>
                    </div>
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </dialog >
    </>
  )
}