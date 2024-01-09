import { forwardRef } from "react";
import { OnlyAs, PolyRefFunction } from "react-polymorphed";
import cn, { Argument } from "classnames";
import { ColorFamily } from "../../types/colors";
import { Link } from "../Link";
import './styles.scss';

const polyRef = forwardRef as PolyRefFunction;



const getTagClasses = ({ className, color, icon, iconPosition, size }: TagProps) => cn('fr-tag', className, {
  'fr-tag--sm': size === "sm",
  [`fr-icon-${icon}`]: icon,
  [`fr-tag--icon-${iconPosition}`]: icon && iconPosition,
  [`fr-tag--${color}`]: color
});

export type TagProps = {
  className?: Argument;
  color?: ColorFamily;
  icon?: string;
  iconPosition?: 'left' | 'right';
  size?: "md" | "sm";
}
export type SelectableTagProps = {
  className?: Argument;
  color?: ColorFamily;
  icon?: string;
  iconPosition?: 'left' | 'right';
  size?: "md" | "sm";
  selected: boolean;
}

export const Tag = polyRef<"p", TagProps, OnlyAs<"button" | "p" | "a">>(({
  as,
  className,
  color,
  icon,
  iconPosition = 'right',
  size,
  ...props
}, ref) => {
  const _classes = getTagClasses({ className, color, icon, iconPosition, size });
  const Component = (as === "a") ? Link : as ? as : 'p';

  return (
    <Component
      ref={ref}
      className={_classes}
      {...props}
    />

  );
});
export const SelectableTag = polyRef<"button", SelectableTagProps, OnlyAs<"button" | "a">>(({
  as,
  className,
  color,
  icon,
  iconPosition = 'left',
  size,
  selected,
  ...props
}, ref) => {
  const _classes = getTagClasses({ className, color, icon, iconPosition, size });
  const Component = (as === "a") ? Link : as ? as : 'button';

  return (
    <Component
      data-fr-js-disable="true"
      ref={ref}
      className={_classes}
      aria-pressed={selected}
      {...props}
    />

  );
});

export const DissmissibleTag = polyRef<"button", TagProps, OnlyAs<"button" | "a">>(({
  as,
  className,
  color,
  icon,
  iconPosition = 'left',
  size,
  ...props
}, ref) => {
  const _classes = cn('fr-tag--dismiss', getTagClasses({ className, color, icon, iconPosition, size }));
  const Component = (as === "a") ? Link : as ? as : 'button';


  return (
    <Component
      ref={ref}
      className={_classes}
      {...props}
    />
  );
});