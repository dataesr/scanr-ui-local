import React, { forwardRef } from 'react';
import cn, { Argument } from 'classnames';
import { Merge } from '../../types/polymophic';

export type ModalCloseProps = Merge<React.HTMLAttributes<HTMLButtonElement>, {
  controls?: string;
  className?: Argument;
}>

export const ModalClose: React.FC<ModalCloseProps> = forwardRef<HTMLButtonElement, ModalCloseProps>(({
  className,
  controls,
  children = "Fermer",
  ...props
}, ref) => (
  <button
    ref={ref}
    id={`${controls}-close`}
    aria-controls={controls || undefined}
    className={cn('fr-btn--close fr-btn', className)}
    type="button"
    {...props}
  >
    {children}
  </button>
));

export default ModalClose;