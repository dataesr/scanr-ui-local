import { Notice, useDSFRConfig, Link } from '@dataesr/dsfr-plus';
import useLocalStorage from '../../hooks/useLocalStorage';
import { RawIntlProvider, createIntl } from 'react-intl';

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

const formating = {
  contact: (chunks: any) => <Link href="/about/contact">{chunks}</Link>,
  br: () => <br />,
};

export default function APIDeprecationBanner() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const [displayBanner, setDisplayBanner] = useLocalStorage<boolean>('api-deprecation-banner', true);
  return (
    <RawIntlProvider value={intl}>
      {displayBanner && (
        <Notice
          type="info"
          closeMode="controlled"
          onClose={() => setDisplayBanner(false)}
        >
          {intl.formatMessage({ id: "deprecation.api" }, formating)}
        </Notice>
      )}
    </RawIntlProvider >
  );
}
