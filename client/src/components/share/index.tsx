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
  const concent = localStorage.getItem('consent');
  const { copy } = useCopyToClipboard();
  const isOk = concent === "all";
  return (
    <div className="fr-share">
      {!isOk && <p className="fr-share__text">
        Veuillez
        <button className="fr-btn fr-btn--secondary" data-fr-opened="false" aria-controls="fr-consent-modal" title="Personnaliser les cookies">
          autoriser le dépot de cookies
        </button>
        pour partager sur Facebook, Twitter et LinkedIn.
      </p>}
      <ul className="fr-share__group">
        <li>
          <a
            className="fr-share__link fr-share__link--facebook"
            title={`Partager sur Facebook ${!isOk ? "- désactivé" : null}`}
            role="link"
            aria-disabled={!isOk}
            onClick={onClickFacebook}
            href={isOk ? `https://www.facebook.com/sharer.php?u=${url}` : undefined}
          >
            Partager sur Facebook
          </a>
        </li>
        <li>
          <a
            className="fr-share__link fr-share__link--twitter"
            title={`Partager sur Twitter ${!isOk ? "- désactivé" : null}`}
            role="link"
            aria-disabled={!isOk}
            onClick={onClickTwitter}
            href={isOk ? `https://twitter.com/intent/tweet?url=${url}` : undefined}
          >
            Partager sur Twitter
          </a>
        </li>
        <li>
          <a
            className="fr-share__link fr-share__link--linkedin"
            title={`Partager sur LinkedIn ${!isOk ? "- désactivé" : null}`}
            role="link"
            aria-disabled={!isOk}
            onClick={onClickLinkedin}
            href={isOk ? `https://www.linkedin.com/shareArticle?url=${url}` : undefined}
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

