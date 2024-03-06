import classNames from 'classnames';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import styles from './styles.module.scss';

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


  return (
    <button title="Copier" onClick={() => copy(copyText)} type="button" className={_className} {...remainingProps}>
      {children}
    </button>
  );
}

