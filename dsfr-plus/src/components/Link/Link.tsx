import { forwardRef } from 'react';
import { useDSFRConfig } from '../../hooks/useDSFRConfig';
import cn, { Argument } from 'classnames';
import { Merge } from '../../types/polymophic';

type BaseLinkProps = {
  className?: Argument;
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  isSimple?: boolean;
  current?: boolean;
};

export type LinkProps = Merge<React.AnchorHTMLAttributes<HTMLAnchorElement>, BaseLinkProps>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  children,
  className,
  icon,
  current,
  iconPosition = "left",
  isSimple = false,
  size = "md",
  ...props
}, ref,
) => {
  const { routerComponent: RouterComponent } = useDSFRConfig();

  const Component = RouterComponent || 'a';
  return (
    <Component
      ref={ref}
      aria-current={current || undefined}
      className={cn({
        'fr-link': isSimple,
        [`fr-link-${size}`]: size !== 'md',
        [`fr-icon-${icon}`]: isSimple && !!icon,
        [`fr-link--icon-${iconPosition}`]: (isSimple && icon),
      }, className)}
      {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
    >
      {children}
    </Component>
  );
})

