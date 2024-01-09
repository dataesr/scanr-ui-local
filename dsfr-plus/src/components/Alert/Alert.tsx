import cn, { Argument } from "classnames";
import { forwardRef, useRef } from "react";
import { ColorType } from "../../types";
import mergeRefs from "../../utils/refs";
import { Merge } from "../../types/polymophic";

type AlertCss = {
  title?: Argument;
  description?: Argument;
  button?: Argument;
}

type AlertBaseProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  closeMode?: "disallow" | "uncontrolled" | "controlled";
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  titleAs?: React.ElementType;
  className?: Argument;
  css?: AlertCss;
  variant: ColorType;
  size?: "md" | "sm";
}

type AlertProps = Merge<React.HTMLAttributes<HTMLDivElement>, AlertBaseProps>;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  className,
  closeMode = "disallow",
  description,
  size,
  onClose,
  title,
  css = {},
  titleAs: TitleAs = "h3",
  variant = 'info',
  ...props
}, ref) => {
  const alertRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: any) => {
    e.preventDefault();
    alertRef.current?.remove();
    if (onClose) onClose(e);
  }

  return (
    <div
      ref={(node) => mergeRefs(node, [ref, alertRef])}
      className={cn(`fr-alert fr-alert--${variant}`, { 'fr-alert--sm': size === "sm" }, className)}
      {...props as React.HTMLAttributes<HTMLDivElement>}
    >
      {title && <TitleAs className={cn("fr-alert__title", css.title)}>{title}</TitleAs>}
      {description && <p className={cn(css.description)}>{description}</p>}
      {(closeMode === "uncontrolled") && <button onClick={handleClose} className={cn("fr-btn--close fr-btn", css.button)}>Masquer le message</button>}
      {(closeMode === "controlled") && <button onClick={onClose} className={cn("fr-link--close fr-link", css.button)}>Masquer le message</button>}
    </div>
  )
})