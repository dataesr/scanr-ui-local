import classNames from 'classnames';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import styles from './styles.module.scss';
import { RawIntlProvider, createIntl } from 'react-intl';
import { useDSFRConfig } from '@dataesr/dsfr-plus';


const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

export type CopyBadgeProps = {
  lowercase?: boolean,
  size?: "sm" | "md",
  className?: string,
  color?: string,
  copyText: string,
  children: React.ReactNode,
};

export default function CopyBadge({
  className,
  color = 'green-menthe',
  copyText,
  size = "md",
  lowercase = false,
  children,
  ...remainingProps
}: CopyBadgeProps) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { copyStatus, copy } = useCopyToClipboard();
  const _className = classNames(
    'fr-badge',
    styles['copy-badge'],
    {
      [`${styles.lowercase}`]: lowercase,
      [`${styles.copied}`]: copyStatus === 1,
      [`${styles.copy}`]: copyStatus === 0,
      [`${styles['copy-error']}`]: copyStatus === 2,
      [`fr-badge--${color}`]: color,
      'fr-badge--sm': size === 'sm',
    },
    className,
  );

  const copyBadgeTitles = [
    intl.formatMessage({ id: "copy-badge.copy" }),
    intl.formatMessage({ id: "copy-badge.copied" }),
    intl.formatMessage({ id: "copy-badge.error" }),
  ]

  return (
    <RawIntlProvider value={intl}>
      <button aria-label={copyBadgeTitles?.[copyStatus]} onClick={() => copy(copyText)} type="button" className={_className} {...remainingProps}>
        {children}
      </button>
    </RawIntlProvider>
  );
}

