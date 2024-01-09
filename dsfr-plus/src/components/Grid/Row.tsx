import cn, { Argument } from 'classnames';
import { Merge } from '../../types/polymophic';

type RowBaseProps = {
  className?: Argument;
  gutters?: boolean;
  verticalAlign?: 'top' | 'bottom' | 'middle';
  horitontalAlign?: 'left' | 'center' | 'right';
}

export type RowProps = Merge<React.HTMLAttributes<HTMLDivElement>, RowBaseProps>;

export const Row = ({
  gutters = false,
  horitontalAlign,
  verticalAlign,
  className,
  ...props
}: RowProps) => {
  const _classes = cn('fr-grid-row', {
    'fr-grid-row--gutters': gutters,
    [`fr-grid-row--${horitontalAlign}`]: horitontalAlign,
    [`fr-grid-row--${verticalAlign}`]: verticalAlign,
  }, className);
  return <div className={_classes} {...props} />;
};

