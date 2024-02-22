import { Link } from "@dataesr/dsfr-plus";
import useConsent from "../../hooks/useConsent";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

const onClickFacebook = (e) => {
  e.preventDefault();
  window.open(
    'https://www.facebook.com/sharer.php',
    'Partager sur Facebook',
    'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450',
  );
};

const onClickTwitter = (e) => {
  e.preventDefault();
  window.open(
    'https://twitter.com/intent/tweet',
    'Partager sur Twitter',
    'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420',
  );
};

const onClickLinkedin = (e) => {
  e.preventDefault();
  window.open(
    'https://www.linkedin.com/shareArticle',
    'Partager sur Linkedin',
    'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420',
  );
};
export default function Share() {
  const url = window.location.href;
  const { consent, dialogId } = useConsent();
  const { copy } = useCopyToClipboard();
  const { facebook, twitter, linkedin } = consent;

  return (
    <div className="fr-share">
      {(!twitter || !facebook || !linkedin) && <p className="fr-share__text">
        Veuillez
        {' '}
        <Link role="button" href={null} data-fr-opened="false" aria-controls={dialogId} title="Personnaliser les cookies">
          autoriser le dépot de cookies
        </Link>
        {' '}
        pour partager sur Facebook, Twitter et LinkedIn.
      </p>}
      <ul className="fr-share__group">
        <li>
          <a
            className="fr-share__link fr-share__link--facebook"
            title={`Partager sur Facebook ${!facebook ? "- désactivé" : null}`}
            role="link"
            aria-disabled={!facebook}
            onClick={onClickFacebook}
            href={facebook ? `https://www.facebook.com/sharer.php?u=${url}` : undefined}
          >
            Partager sur Facebook
          </a>
        </li>
        <li>
          <a
            className="fr-share__link fr-share__link--twitter"
            title={`Partager sur Twitter ${!twitter ? "- désactivé" : null}`}
            role="link"
            aria-disabled={!twitter}
            onClick={onClickTwitter}
            href={twitter ? `https://twitter.com/intent/tweet?url=${url}` : undefined}
          >
            Partager sur Twitter
          </a>
        </li>
        <li>
          <a
            className="fr-share__link fr-share__link--linkedin"
            title={`Partager sur LinkedIn ${!linkedin ? "- désactivé" : null}`}
            role="link"
            aria-disabled={!linkedin}
            onClick={onClickLinkedin}
            href={linkedin ? `https://www.linkedin.com/shareArticle?url=${url}` : undefined}
          >
            Partager sur LinkedIn
          </a>
        </li>
        <li>
          <a
            className="fr-share__link fr-share__link--mail"
            href={`mailto:?subject=Visitez la page sur scanR&body=${url}`}
            title="Partager par email"
            target="_blank"
            rel="noreferrer"
          >
            Partager par email
          </a>
        </li>
        <li>
          <button
            className="fr-share__link fr-share__link--copy"
            title="Copier dans le presse-papier"
            onClick={() => copy(url)}
          >
            Copier dans le presse-papier
          </button>
        </li>
      </ul>
    </div >
  )
}

