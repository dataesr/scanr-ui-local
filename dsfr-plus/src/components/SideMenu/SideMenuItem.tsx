import cn, { Argument } from "classnames";
import { cloneElement, isValidElement, useId } from "react";
import { getChildrenOfTypes } from "../../utils/children";
import { Link, LinkProps } from "../Link";
import { Merge } from "../../types/polymophic";

type SideMenuItemCss = {
  "fr-sidemenu__link"?: Argument;
  "fr-sidemenu__list"?: Argument;
  "fr-sidemenu__item"?: Argument;
}

export type SideMenuItemBaseProps = {
  className?: Argument;
  css?: SideMenuItemCss;
  current?: boolean;
  defaultExpanded: boolean;
  href?: string;
  icon?: string;
  title: React.ReactNode | string;
}

export type SideMenuItemProps = Merge<React.HTMLAttributes<HTMLButtonElement>, SideMenuItemBaseProps>;

export const SideMenuItem = ({
  children,
  className,
  css = {},
  current,
  defaultExpanded = false,
  href,
  icon,
  title,
  ...props
}: SideMenuItemProps) => {
  const id = useId()
  const childs = getChildrenOfTypes(children, [SideMenuItem, Link]);
  return (
    <>
      <button
        className={cn("fr-sidemenu__btn", className)}
        aria-expanded={defaultExpanded}
        aria-controls={id}
        aria-current={current || undefined}
        {...props}
      >
        <span className={icon && `react-dsfr-sidemenu-title--icon fr-icon-${icon} fr-icon--sm`}>{title}</span>
      </button>
      <div className="fr-collapse" id={id}>
        <ul className={cn("fr-sidemenu__list", css["fr-sidemenu__list"])}>
          {childs.map((child, i) => (
            <li className={cn("fr-sidemenu__item", css["fr-sidemenu__item"])} key={`navitem-${id}-${i}`}>
              {
                (isValidElement(child) && child.type === Link)
                  ? cloneElement((child as React.ReactElement<LinkProps>), { className: cn("fr-sidemenu__link", child.props.className) })
                  : child
              }
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
