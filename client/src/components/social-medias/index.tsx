import { OrganizationSocialMediasData } from "../../api/types/organization";

export default function SocialMedias({ data: socialMedias }: { data: OrganizationSocialMediasData }) {
  if (!socialMedias?.length) return null;
  return (
    <div className="fr-follow">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-follow__social">
              <ul className="fr-btns-group">
                {socialMedias?.map((socialMedia, i) => (
                  <li key={i} style={{ width: "100%" }}>
                    <a
                      className={`fr-btn--${socialMedia.type?.toLowerCase()} fr-btn social-btn`}
                      href={socialMedia.url}
                      target="_blank"
                      rel="noreferrer noopener external"
                    >
                      {socialMedia.type?.toLowerCase()}
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