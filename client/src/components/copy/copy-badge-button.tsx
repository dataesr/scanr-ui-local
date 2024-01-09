import classNames from 'classnames';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import styles from './styles.module.scss';

export type CopyBadgeButtonProps = {
  lowercase?: boolean,
  size?: "sm" | "md",
  className?: string,
  color?: string,
  text: string,
};

const iconsType: Record<string, string> = {
  Copié: 'checkbox-circle-fill',
  Erreur: 'settings-6-fill',
};

export default function CopyBadgeButton({
  className,
  color = 'green-menthe',
  text,
  size = "md",
  lowercase = false,
  ...remainingProps
}: CopyBadgeButtonProps) {
  const { copyStatus, copy } = useCopyToClipboard();
  const icon = copyStatus ? iconsType[copyStatus] : 'file-copy-line'
  const _className = classNames(
    'fr-badge',
    {
      [`${styles.lowercase}`]: lowercase,
      [`fr-badge--${color}`]: color,
      'fr-badge--sm': size === 'sm',
      [`fr-icon-${icon}`]: true,
    },
    className,
  );


  return (
    <button title="Copier" onClick={() => copy(text)} type="button" className={_className} {...remainingProps}>
      {copyStatus === 'Copié' ? 'COPIÉ' : text}
    </button>
  );
}

