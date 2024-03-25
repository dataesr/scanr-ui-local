import { Notice, useDSFRConfig } from "@dataesr/dsfr-plus";
import { createIntl } from "react-intl";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


export default function Error500({ error }: { error: unknown }) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  return (
    <div className="fr-container">
      <div className="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
        <div className="fr-py-0 fr-col-12 fr-col-md-6">
          <h1>
            {intl.formatMessage({ id: "error500.title" })}
          </h1>
          <p className="fr-text--sm fr-mb-3w">
            {intl.formatMessage({ id: "error500.code" })}
          </p>
          <p className="fr-text--sm fr-mb-5w">
            {intl.formatMessage({ id: "error500.message" })}
          </p>
          <p className="fr-text--md fr-mb-3w">
            {intl.formatMessage({ id: "error500.tryAgain" })}
          </p>
          <ul className="fr-btns-group fr-btns-group--inline-md">
            <li>
              <a className="fr-btn fr-btn--secondary" href="[À MODIFIER - lien vers un formulaire de contact]">
                {intl.formatMessage({ id: "error.contactUs" })}
              </a>
            </li>
          </ul>
          {error && <Notice className="fr-my-5w" type="error" closeMode="disallow">
            <pre>
              <code>
                {JSON.stringify(error, null, 2)}
              </code>
            </pre>
          </Notice>}
        </div>
        <div className="fr-col-12 fr-col-md-3 fr-col-offset-md-1 fr-px-6w fr-px-md-0 fr-py-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="fr-responsive-img fr-artwork" aria-hidden="true" width="160" height="200" viewBox="0 0 160 200">
            <use className="fr-artwork-motif" href="/artwork/pictograms/system/ovoid.svg#artwork-motif" />
            <use className="fr-artwork-background" href="/artwork/pictograms/system/ovoid.svg#artwork-background" />
            <g transform="translate(40, 60)">
              <use className="fr-artwork-decorative" href="/artwork/pictograms/system/technical-error.svg#artwork-decorative" />
              <use className="fr-artwork-minor" href="/artwork/pictograms/system/technical-error.svg#artwork-minor" />
              <use className="fr-artwork-major" href="/artwork/pictograms/system/technical-error.svg#artwork-major" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}