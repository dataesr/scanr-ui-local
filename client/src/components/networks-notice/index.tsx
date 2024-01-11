import { createIntl } from 'react-intl';
import { Link, Notice, useDSFRConfig } from '@dataesr/dsfr-plus';
import messageFr from './locales/fr.json';
import messageEn from './locales/en.json';
import './styles.scss';

const messages = { fr: messageFr, en: messageEn };

export default function NetworksNotice({ url }: { url: string }) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({
    locale,
    messages: messages[locale]
  });
  return (
    <Notice className="fr-mb-3w fr-enlarge-link" type="info" closeMode="disallow">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Link href={url} className="network-notice">
            {intl.formatMessage({ id: "organizations.networks.notice" })}
          </Link>
        </div>
        <span className="fr-icon-arrow-right-s-line" />
      </div>
    </Notice>
  );
} 