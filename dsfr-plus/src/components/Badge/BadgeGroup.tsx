import { useId } from 'react';
import classNames from 'classnames';
import { getChildrenOfType } from '../../utils/children';
import { Merge } from '../../types/polymophic';
import { Badge } from './Badge';

type BadgeGroupBaseProps = {
  className?: string;
}

export type BadgeGroupProps = Merge<React.HTMLAttributes<HTMLUListElement>, BadgeGroupBaseProps>;

export const BadgeGroup: React.FC<BadgeGroupProps> = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  const id = useId();
  const _classes = classNames('fr-badges-group', className);
  return (
    <ul className={_classes} {...props}>
      {getChildrenOfType(children, Badge).map((child, index) => <li key={`${id}-${index}`}>{child}</li>)}
    </ul>
  );
};
