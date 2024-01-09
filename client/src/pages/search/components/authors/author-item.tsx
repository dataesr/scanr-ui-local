import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link } from "@dataesr/dsfr-plus";
import { encode } from "../../../../utils/string";
import { Author } from "../../../../api/types/author";
import { getAuthorById } from "../../../../api/authors";
import { ItemProps } from "../../types";
import CopyBadgeButton from "../../../../components/copy/copy-badge-button";


export default function AuthorItem({ data: author, highlight }: ItemProps<Author>) {
  const queryClient = useQueryClient();

  function prefetchAuthor(id: string) {
    queryClient.prefetchQuery({
      queryKey: ['author', id],
      queryFn: () => getAuthorById(encode(id)),
      staleTime: Infinity,
    })
  }

  return (
    <Fragment key={author.id}>
      <div className="result-item" key={author.id}>
        <span onMouseEnter={() => prefetchAuthor(author.id)}><Link href={`/authors/${encode(author.id)}`} className="fr-link">
          {author.fullName}
        </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {author?.domains?.filter((domain) => domain.label.default?.trim()).slice(0, 10).map((domain, k) => (
            (domain.type === "wikidata") && (
              <Fragment key={k}>
                {(k > 0) ? ', ' : ''}
                <Link href={`/search/authors?q=${encode(domain?.label.default)}`}>#{domain?.label.default}</Link>
              </Fragment>)
          ))}
        </Text>
        <div>
          {[author.id.replace("idref", ""), author.orcid]
            ?.filter((id) => id)
            .map((id) => <CopyBadgeButton key={id} lowercase size="sm" text={id} />)
          }
        </div>
        {highlight?.["domains.label.default"] && (
          <Text size="sm" className="fr-mb-0">
            Mots clés:
            {' '}
            <span dangerouslySetInnerHTML={{ __html: highlight?.["domains.label.default"] }} />
          </Text>
        )}
        {highlight?.["publications.title.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["summary.default"] }} />
            ...
          </Text>
        )}
        {highlight?.["publications.summary.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["summary.default"] }} />
            ...
          </Text>
        )}
      </div>
    </Fragment>
  )
}