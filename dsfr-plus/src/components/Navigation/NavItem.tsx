import { useId, isValidElement, cloneElement } from 'react';
import { getChildrenOfTypes } from '../../utils/children';
import cn, { Argument } from 'classnames';
import { Link, LinkProps } from '../Link';
import { Merge } from '../../types/polymophic';

type NavItemCss = {
  "fr-menu"?: Argument;
  "fr-menu__list"?: Argument;
}

export type NavItemBaseProps = {
  children?: React.ReactNode[] | React.ReactNode;
  className?: Argument;
  css?: NavItemCss;
  current?: boolean;
  title: string;
}

export type NavItemProps = Merge<React.HTMLAttributes<HTMLButtonElement>, NavItemBaseProps>;

export const NavItem = ({
  children,
  className,
  current = false,
  css = {},
  title,
  ...props
}: NavItemProps) => {
  const id = useId()
  const childs = getChildrenOfTypes(children, [NavItem, Link]);
  return (
    <>
      <button
        className={cn("fr-nav__btn", className)}
        aria-expanded="false"
        aria-controls={id}
        aria-current={current || undefined}
        {...props}
      >
        {title}
      </button>
      <div className={cn("fr-collapse", "fr-menu", css["fr-menu"])} id={id}>
        <ul className={cn("fr-menu__list", css["fr-menu__list"])}>
          {childs.map((child, i) => (
            <li className="fr-nav__item" key={`navitem-${id}-${i}`}>
              {
                (isValidElement(child) && child.type === Link)
                  ? cloneElement((child as React.ReactElement<LinkProps>), { className: cn("fr-nav__link", child.props.className) })
                  : child
              }
            </li>
          ))}
        </ul>
      </div>
    </>
  )
};