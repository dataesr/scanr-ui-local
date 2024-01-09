import { Merge } from "../../types/polymophic";
import { Link } from "../Link";
import cn, { Argument } from "classnames";

type ServiceCss = {
  "fr-header__service-title"?: Argument;
  "fr-header__service-tagline"?: Argument;
}

export type ServiceBaseProps = {
  className?: Argument;
  css?: ServiceCss;
  name: string;
  tagline?: string;
  href?: string;
}
export type ServiceProps = Merge<React.HTMLAttributes<HTMLAnchorElement>, ServiceBaseProps>;



export const Service = ({ href = '/', name, tagline, className, css = {}, ...props }: ServiceProps) => {
  return (
    <div className={cn("fr-header__service", className)}>
      <p className={cn("fr-header__service-title", css["fr-header__service-title"])}>
        <Link href={href} {...props}>
          {name}
        </Link>
      </p>
      {tagline && <p className={cn("fr-header__service-tagline", css["fr-header__service-tagline"])}>{tagline}</p>}
    </div>
  )
}
