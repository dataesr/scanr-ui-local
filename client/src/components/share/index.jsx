import { Share, ShareLink } from "./Share";

export default function SharePage() {
  const onClickFacebook = () => {
    window.open(
      'https://www.facebook.com/sharer.php',
      'Partager sur Facebook',
      'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450',
    );
  };

  const onClickTwitter = () => {
    window.open(
      'https://twitter.com/intent/tweet',
      'Partager sur Twitter',
      'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420',
    );
  };

  const onClickLinkedin = () => {
    window.open(
      'https://www.linkedin.com/shareArticle',
      'Partager sur Linkedin',
      'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420',
    );
  };
  return (
    <Share className="fr-text--bold" title="Partager la page">
      <ShareLink
        onClick={onClickFacebook}
        type="facebook"
        label="Partager sur facebook"
        href="https://www.facebook.com/sharer.php"
      />
      <ShareLink
        onClick={onClickTwitter}
        type="twitter"
        label="Partager sur twitter"
        href="https://twitter.com/intent/tweet"
      />
      <ShareLink
        onClick={onClickLinkedin}
        type="linkedin"
        label="Partager sur linkedin"
        href="https://www.linkedin.com/shareArticle"
      />
    </Share>
  )
}