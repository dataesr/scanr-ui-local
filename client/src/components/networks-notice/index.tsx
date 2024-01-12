import { createIntl } from 'react-intl';
import { Link, Notice, useDSFRConfig } from '@dataesr/dsfr-plus';
import './styles.scss';

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


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
            {intl.formatMessage({ id: "networks.notice" })}
          </Link>
        </div>
        <span className="fr-icon-arrow-right-s-line" />
      </div>
    </Notice>
  );
} 