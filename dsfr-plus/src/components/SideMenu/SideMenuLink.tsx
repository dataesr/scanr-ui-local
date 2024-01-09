import cn, { Argument } from "classnames";
import { Link } from "../Link";
import { Merge } from "../../types/polymophic";

type SideMenuLinkCss = {
  "fr-sidemenu__link"?: Argument;
}

export type SideMenuLinkBaseProps = {
  children?: React.ReactNode[] | React.ReactNode | string;
  className?: Argument;
  css?: SideMenuLinkCss;
  current?: boolean;
  icon?: string;
}

export type SideMenuLinkProps = Merge<React.HTMLAttributes<HTMLAnchorElement>, SideMenuLinkBaseProps>;

export const SideMenuLink = ({
  children,
  className,
  css = {},
  current,
  icon,
  ...props
}: SideMenuLinkProps) => (
  <li className={cn("fr-sidemenu__item", className)}>
    <Link
      className={cn("fr-sidemenu__link", css["fr-sidemenu__link"])}
      aria-current={current || undefined}
      {...props}
    >
      <span className={icon && `react-dsfr-sidemenu-title--icon fr-icon-${icon} fr-icon--sm`}>
        {children}
      </span>
    </Link>
  </li>
)