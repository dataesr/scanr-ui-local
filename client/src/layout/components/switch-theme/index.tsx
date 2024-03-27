import { useDSFRConfig } from "@dataesr/dsfr-plus";
import { RawIntlProvider, createIntl } from "react-intl";


const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

export default function SwitchTheme() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });

  return (
    <RawIntlProvider value={intl}>
      <dialog id="fr-theme-modal" className="fr-modal" role="dialog" aria-labelledby="fr-theme-modal-title">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-btn--close fr-btn" aria-controls="fr-theme-modal" id="button-5622" title="Fermer">
                    {intl.formatMessage({ id: "layout.switch-theme.close" })}
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-theme-modal-title" className="fr-modal__title">
                    {intl.formatMessage({ id: "layout.switch-theme.title" })}
                  </h1>
                  <div id="fr-display" className="fr-display">
                    <fieldset className="fr-fieldset" id="display-fieldset">
                      <legend className="fr-fieldset__legend--regular fr-fieldset__legend" id="display-fieldset-legend">
                        {intl.formatMessage({ id: "layout.switch-theme.legend" })}
                      </legend>
                      <div className="fr-fieldset__element">
                        <div className="fr-radio-group fr-radio-rich">
                          <input value="light" type="radio" id="fr-radios-theme-light" name="fr-radios-theme" />
                          <label className="fr-label" htmlFor="fr-radios-theme-light">
                            {intl.formatMessage({ id: "layout.switch-theme.light" })}
                          </label>
                          <div className="fr-radio-rich__img">
                            <svg aria-hidden="true" className="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">
                              <use className="fr-artwork-decorative" href="/artwork/pictograms/environment/sun.svg#artwork-decorative" />
                              <use className="fr-artwork-minor" href="/artwork/pictograms/environment/sun.svg#artwork-minor" />
                              <use className="fr-artwork-major" href="/artwork/pictograms/environment/sun.svg#artwork-major" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="fr-fieldset__element">
                        <div className="fr-radio-group fr-radio-rich">
                          <input value="dark" type="radio" id="fr-radios-theme-dark" name="fr-radios-theme" />
                          <label className="fr-label" htmlFor="fr-radios-theme-dark">
                            {intl.formatMessage({ id: "layout.switch-theme.dark" })}
                          </label>
                          <div className="fr-radio-rich__img">
                            <svg aria-hidden="true" className="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">
                              <use className="fr-artwork-decorative" href="/artwork/pictograms/environment/moon.svg#artwork-decorative" />
                              <use className="fr-artwork-minor" href="/artwork/pictograms/environment/moon.svg#artwork-minor" />
                              <use className="fr-artwork-major" href="/artwork/pictograms/environment/moon.svg#artwork-major" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="fr-fieldset__element">
                        <div className="fr-radio-group fr-radio-rich">
                          <input value="system" type="radio" id="fr-radios-theme-system" name="fr-radios-theme" />
                          <label className="fr-label" htmlFor="fr-radios-theme-system">
                            {intl.formatMessage({ id: "layout.switch-theme.system" })}
                            <span className="fr-hint-text">
                              {intl.formatMessage({ id: "layout.switch-theme.system-hint" })}
                            </span>
                          </label>
                          <div className="fr-radio-rich__img">
                            <svg aria-hidden="true" className="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">
                              <use className="fr-artwork-decorative" href="/artwork/pictograms/system/system.svg#artwork-decorative" />
                              <use className="fr-artwork-minor" href="/artwork/pictograms/system/system.svg#artwork-minor" />
                              <use className="fr-artwork-major" href="/artwork/pictograms/system/system.svg#artwork-major" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </fieldset>
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