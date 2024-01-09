import { forwardRef } from "react";
import cn, { Argument } from "classnames";
import { DSFRColors } from "../../types/colors";

export type SnippetProps = {
  icon?: string;
  className?: Argument;
  size?: "md" | "sm";
  children: string;
  color?: DSFRColors;
}

export const Snippet = forwardRef<HTMLButtonElement, SnippetProps>(
  ({ className, color = 'blue-france', size, icon, ...props }, ref) => {
    const _classes = cn(
      'fr-snippet',
      'fr-badge',
      {
        [`fr-badge--${color}`]: color,
        [`fr-icon-${icon}`]: icon,
        "fr-badge-icon": icon,
        'fr-badge--no-icon': !icon,
        'fr-badge--sm': size === "sm",
      },
      className,
    );
    return <button className={_classes} ref={ref} {...props} />;
  }
);
