import cn, { Argument } from 'classnames';
import { forwardProps } from '../../utils/props';
import { forwardRef } from 'react';
import { Merge } from '../../types/polymophic';

export type ModalTitleProps = Merge<React.HTMLAttributes<HTMLHeadingElement>, {
  icon?: string;
  className?: Argument;
}>;

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(({
  children,
  className,
  icon,
  id,
  ...props
}, ref) => {
  const _classes = cn('fr-modal__title', className)
  return (
    <h1
      ref={ref}
      className={_classes}
      id={`${id}-title`}
      {...forwardProps(props as React.HTMLAttributes<HTMLHeadingElement>)}
    >
      {icon && <span className={`fr-icon-${icon} fr-icon--lg`} />}
      {children}
    </h1>
  );
});
