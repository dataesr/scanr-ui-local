import classNames from 'classnames';
import { getChildrenOfTypes } from '../../utils/children';
import { forwardProps } from '../../utils/props';
import { useId } from 'react';
import { Tag, SelectableTag, DissmissibleTag } from './Tag';

export interface TagGroupProps {
  className?: string;
  children: React.ReactNode;
}

export const TagGroup: React.FC<TagGroupProps> = ({
  className,
  children,
  ...props
}) => {
  const id = useId();
  const _classes = classNames('fr-tags-group', className);
  return (
    <ul className={_classes} {...forwardProps(props)}>
      {getChildrenOfTypes(children, [Tag, SelectableTag, DissmissibleTag]).map((child, index) => <li key={`${id}-${index}`}>{child}</li>)}
    </ul>
  );
};
