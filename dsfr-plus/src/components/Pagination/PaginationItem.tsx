import { Link } from "..";
import { Merge } from "../../types/polymophic";

export type PaginationItemProps = Merge<React.HTMLAttributes<HTMLAnchorElement>, {
  page: number,
  isActive?: boolean,
  buildURL: (page: number) => string,
  aria: string
}>;

export const PaginationItem = ({
  page,
  isActive = false,
  buildURL,
  aria,
  ...props
}: PaginationItemProps) => {
  return (
    <li>
      <Link
        aria-current={(isActive && 'page') || undefined}
        href={buildURL(page)}
        className="fr-pagination__link"
        aria-label={aria}
        title={aria}
        {...props}
      >
        {page}
      </Link>
    </li>
  );
};