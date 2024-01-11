import { OrganizationLinksData } from "../../api/types/organization";

export default function Websites({ data: links }: { data: OrganizationLinksData }) {
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
                      {link.type?.toLowerCase()}
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