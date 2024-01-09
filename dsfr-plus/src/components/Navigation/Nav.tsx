import { cloneElement, isValidElement, useId } from 'react';
import { getChildrenOfTypes } from '../../utils/children';
import cn, { Argument } from 'classnames';
import { Link, LinkProps } from '../Link';
import { Merge } from '../../types/polymophic';
import { NavItem } from './NavItem';

type NavCss = {
  'fr-nav__list'?: Argument;
  "fr-nav__item"?: Argument;
}

export type NavBaseProps = {
  className?: Argument;
  css?: NavCss;
}

export type NavProps = Merge<React.HTMLAttributes<HTMLDivElement>, NavBaseProps>;

export const Nav = ({
  children,
  className,
  css = {},
  ...props
}: NavProps) => {
  const _id = useId();
  const id = props.id || _id;
  return (
    <nav className={cn("fr-nav", className)} id={id} role="navigation" {...props}>
      <ul className={cn('fr-nav__list', css['fr-nav__list'])}>
        {getChildrenOfTypes(children, [NavItem, Link]).map((child, i) => (
          isValidElement(child) && (
            <li className={cn("fr-nav__item", css["fr-nav__item"])} key={`navitem-${id}-${i}`}>
              {
                (child.type === Link)
                  ? cloneElement((child as React.ReactElement<LinkProps>), { className: cn("fr-nav__link", child.props.className) })
                  : child
              }
            </li>
          )
        ))}
      </ul>
    </nav>
  );
};