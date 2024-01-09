import { forwardRef } from "react";
import { OnlyAs, PolyRefFunction } from "react-polymorphed";
import cn, { Argument } from "classnames";
import { DSFRColors } from "../../types/colors";
import { Link } from "../Link";

const polyRef = forwardRef as PolyRefFunction;

export type ButtonProps = React.PropsWithChildren<{
  className?: Argument
  color?: DSFRColors | 'blue-france';
  icon?: string;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text';
}>;

export const Button = polyRef<"button", ButtonProps, OnlyAs<"button" | "a">>(
  ({ as, className, color = 'blue-france', icon, iconPosition = 'left', size = 'md', variant = 'primary', children, ...props }, ref) => {
    const Component = (as === "a") ? Link : as ? as : "button";
    const _classes = cn(
      'fr-btn',
      {
        [`fr-btn--${size}`]: size !== 'md',
        [`dfr-btn--${color}`]: (!!color && color !== 'blue-france'),
        'fr-btn--secondary': variant === 'secondary',
        'fr-btn--tertiary': variant === 'tertiary',
        'fr-btn--tertiary-no-outline': variant === 'text',
        [`fr-icon-${icon}`]: !!icon,
        [`fr-btn--icon-${iconPosition}`]: (icon && children),
        'fr-btn--icon': (icon && !children),
      },
      className,
    );
    return <Component className={_classes} ref={ref} {...props}>{children}</Component>;
  }
);
