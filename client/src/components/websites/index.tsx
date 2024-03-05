import { useDSFRConfig } from "@dataesr/dsfr-plus";
import { createIntl } from "react-intl";
import { OrganizationLinksData } from "../../types/organization";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

export default function Websites({ data: links }: { data: OrganizationLinksData }) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })

  if (!links?.length) return null;
  return (
    <div className="fr-follow">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-follow__social">
              <ul className="fr-btns-group">
                {links?.map((link, i) => (
                  <li key={i} style={{ width: "100%" }}>
                    <a
                      className="fr-btn--links fr-btn social-btn"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener external"
                    >
                      {/* {link.type?.toLowerCase()} */}
                      {intl.formatMessage({ id: `websites.types.${link.type}` })}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}