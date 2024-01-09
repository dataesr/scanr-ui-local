import cn, { Argument } from 'classnames';
import { forwardRef } from 'react';
import { Merge } from '../../types/polymophic';

export type ModalContentProps = Merge<React.HTMLAttributes<HTMLDivElement>, {
  className?: Argument;
}>

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(({
  className, ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('fr-modal__content', className)}
    {...props}
  />
));