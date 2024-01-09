import cn, { Argument } from "classnames";
import { useId, isValidElement, cloneElement } from "react";
import { getChildrenOfTypes } from "../../utils/children";
import { forwardProps } from "../../utils/props";
import { Link, LinkProps, SideMenuItem } from "..";
import { Merge } from "../../types/polymophic";

type SideMenuCss = {
  "fr-sidemenu__inner"?: Argument;
  "fr-sidemenu__btn"?: Argument;
  "fr-sidemenu__title"?: Argument;
  "fr-sidemenu__list"?: Argument;
  "fr-sidemenu__item"?: Argument;
}

export type SideMenuBaseProps = {
  className?: Argument;
  css?: SideMenuCss;
  sticky?: boolean;
  fullHeight?: boolean;
  position?: 'left' | 'right';
  title: string;
}
export type SideMenuProps = Merge<React.HTMLAttributes<HTMLDivElement>, SideMenuBaseProps>;

export const SideMenu = ({
  children,
  className,
  css = {},
  fullHeight,
  position,
  sticky,
  title,
  ...props
}: SideMenuProps) => {
  const id = useId();
  const _cn = cn('fr-sidemenu', className, {
    'fr-sidemenu--sticky': sticky && !fullHeight,
    'fr-sidemenu--sticky-full-height': fullHeight,
    'fr-sidemenu--right': position === 'right',
  })
  return (
    <nav className={_cn} aria-label="Menu latéral" {...forwardProps(props as React.HTMLAttributes<HTMLDivElement>)}>
      <div className={cn("fr-sidemenu__inner", css["fr-sidemenu__inner"])}>
        <button
          type="button"
          className={cn("fr-sidemenu__btn", css["fr-sidemenu__btn"])}
          aria-controls={id}
          aria-expanded={false}
        >
          {title || "Dans cette rubrique"}
        </button>
        <div className="fr-collapse" id={id}>
          {title && <div className={cn("fr-sidemenu__title", css["fr-sidemenu__title"])}>{title}</div>}
          <ul className={cn("fr-sidemenu__list", css["fr-sidemenu__list"])}>
            {getChildrenOfTypes(children, [SideMenuItem, Link]).map((child, i) => (
              isValidElement(child) && (
                <li className={cn("fr-sidemenu__item", css["fr-sidemenu__item"])} key={`navitem-${id}-${i}`}>
                  {
                    (child.type === Link)
                      ? cloneElement((child as React.ReactElement<LinkProps>), { className: cn("fr-sidemenu__link", child.props.className) })
                      : child
                  }
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}