import { cloneElement, isValidElement, useId } from 'react';
import cn, { Argument } from 'classnames';
import { getChildrenOfType } from "../../utils/children"
import { Link, LinkProps } from '../Link';
import { Merge } from '../../types/polymophic';

export type BreadcrumbCss = {
  button?: Argument;
  list?: Argument;
  item?: Argument;
}

export type BreadcrumbBaseProps = {
  buttonLabel?: string;
  className?: Argument;
  css?: BreadcrumbCss;
}

export type BreadcrumbProps = Merge<React.HTMLAttributes<HTMLDivElement>, BreadcrumbBaseProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  buttonLabel = 'Voir le fil d’Ariane',
  children,
  className,
  css = {},
  ...props
}) => {
  const id = useId();
  return (
    <nav role="navigation" aria-label={props['aria-label'] || 'vous êtes ici:'} className={cn("fr-breadcrumb", className)} {...props}>
      <button className={cn("fr-breadcrumb__button", css.button)} aria-expanded="false" aria-controls="breadcrumb-1">{buttonLabel || 'Voir le fil d’Ariane'}</button>
      <div className="fr-collapse" id="breadcrumb-1">
        <ol className={cn("fr-breadcrumb__list", css.list)}>
          {getChildrenOfType(children, Link).filter(child => isValidElement(child)).map((child, i, { length }) => {
            return (
              <li key={`${id}-${i}`} className={cn(css.item)}>
                {cloneElement(child as React.ReactElement<LinkProps>, {
                  className: cn("fr-breadcrumb__link"),
                  'aria-current': (i + 1 === length) ? 'page' : undefined,
                })}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}