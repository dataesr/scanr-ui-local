import { forwardRef } from "react";
import { OnlyAs, PolyRefFunction } from "react-polymorphed";
import cn, { Argument } from "classnames";
import { DSFRColors } from "../../types/colors";
import { Link } from "../Link";

const polyRef = forwardRef as PolyRefFunction;

export type BadgeType =
  | "new"
  | 'error'
  | 'info'
  | 'warning'
  | 'success';

export type BadgeProps = {
  icon?: string;
  className?: Argument;
  size?: "md" | "sm";
  children: string;
  noIcon?: boolean;
  color?: DSFRColors;
  variant?: BadgeType;
}
export const Badge = polyRef<"p", BadgeProps, OnlyAs<"button" | "p" | "a">>(
  ({ as, className, noIcon, color = 'blue-france', size, icon, variant = 'primary', ...props }, ref) => {
    const Component = (as === "a") ? Link : as ? as : "p";
    const _classes = cn(
      'fr-badge',
      {
        [`fr-badge--${variant}`]: variant,
        [`fr-badge--${color}`]: color,
        [`fr-icon-${icon}`]: icon,
        // Next line is a hack to oblige dsfr to display the icon because otherwise 
        // "content: none" is applied on .fr-badge[class^="fr-icon-"]
        "fr-badge--icon-": icon,
        'fr-badge--no-icon': noIcon,
        'fr-badge--sm': size === "sm",
      },
      className,
    );
    return <Component className={_classes} ref={ref} {...props} />;
  }
);
