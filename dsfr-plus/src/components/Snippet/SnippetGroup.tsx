import { useId } from 'react';
import classNames from 'classnames';
import { getChildrenOfType } from '../../utils/children';
import { Merge } from '../../types/polymophic';
import { Snippet } from './Snippet';

type SnippetGroupBaseProps = {
  className?: string;
}

export type SnippetGroupProps = Merge<React.HTMLAttributes<HTMLUListElement>, SnippetGroupBaseProps>;

export const SnippetGroup: React.FC<SnippetGroupProps> = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  const id = useId();
  const _classes = classNames('fr-badges-group', className);
  return (
    <ul className={_classes} {...props}>
      {getChildrenOfType(children, Snippet).map((child, index) => <li key={`${id}-${index}`}>{child}</li>)}
    </ul>
  );
};
