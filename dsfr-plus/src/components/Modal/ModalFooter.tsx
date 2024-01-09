import React, { forwardRef } from 'react';
import cn, { Argument } from 'classnames';
import { Merge } from '../../types/polymophic';

type ModalFooterProps = Merge<React.HTMLAttributes<HTMLDivElement>, {
  className?: Argument;
}>

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('fr-modal__footer', className)}
    {...props}
  />
));

