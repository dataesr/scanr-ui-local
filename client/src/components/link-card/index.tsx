import cs from 'classnames';
import './styles.scss';


export type LinkCardProps = {
  children: React.ReactNode
  type: "organization" | "author" | "prize"
  prefetch?: () => void;
  icon?: string;
}

export default function LinkCard({ children, type, prefetch, icon }: LinkCardProps) {
  const css = cs("link-card", `link-card--${type}`, "fr-p-1w");
  const cssInner = cs(`avatar avatar--${type}`, "fr-mr-2w", { [`fr-icon-${icon}`]: icon });
  return (
    <div onMouseEnter={prefetch} className={css}>
      <div className={cssInner} />
      <div className="link-card__content fr-pr-3w">
        {children}
      </div>
    </div>
  );
}