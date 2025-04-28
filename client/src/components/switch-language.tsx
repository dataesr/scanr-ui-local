import { useDSFRConfig } from "@dataesr/dsfr-plus";
import { useId } from "react";

export default function SwitchLanguage({ languages }) {
  const { locale, setLocale } = useDSFRConfig();
  const id = useId()

  const currentLanguage = languages.find(({ key }) => key === locale)

  return (
    <nav role="navigation" className="fr-translate fr-nav">
      <div className="fr-nav__item">
        <button className="fr-translate__btn fr-btn fr-btn--tertiary" aria-controls={id} aria-expanded="false" title="Sélectionner une langue">
          <>{currentLanguage.shortName}<span key={currentLanguage.key} className="fr-hidden-lg"> - {currentLanguage.fullName}</span></>
        </button>
        <div className="fr-collapse fr-translate__menu fr-menu" id={id}>
          <ul className="fr-menu__list">
            {
              languages.map(({ key, shortName, fullName }) => {
                return (
                  <li key={key}>
                    <button
                      onClick={() => setLocale(key)}
                      className="fr-translate__language fr-nav__link"
                      lang={key}
                      aria-current={locale === key}
                    >
                      {shortName} - {fullName}
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
