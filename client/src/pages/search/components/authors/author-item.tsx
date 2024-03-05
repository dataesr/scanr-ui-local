import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link, BadgeGroup, Badge } from "@dataesr/dsfr-plus";
import { encode } from "../../../../utils/string";
import { LightAuthor } from "../../../../types/author";
import { getAuthorById } from "../../../../api/authors/[id]";
import { ItemProps } from "../../types";
import CopyBadge from "../../../../components/copy/copy-badge";


export default function AuthorItem({ data: author, highlight }: ItemProps<LightAuthor>) {
  const queryClient = useQueryClient();

  function prefetchAuthor(id: string) {
    queryClient.prefetchQuery({
      queryKey: ['author', id],
      queryFn: () => getAuthorById(id),
    })
  }

  return (
    <Fragment key={author.id}>
      <div className="result-item" key={author.id}>
        <BadgeGroup className="structure-badge-list fr-mt-1v">
          <Badge size="sm" color='orange-terre-battue'>Auteur</Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetchAuthor(author.id)}><Link href={`/authors/${author.id}`} className="fr-link">
          {author.fullName}
        </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {author?.domains
            ?.filter((domain) => (domain.type === "wikidata"))
            ?.slice(0, 8)
            .map((domain, k) => (
              <Fragment key={k}>
                {(k > 0) ? ', ' : ''}
                <Link href={`/search/authors?q="${encode(domain?.label.default)}"`}>#{domain?.label.default}</Link>
              </Fragment>
            )
            )}
        </Text>
        <div className="fr-mt-1w fr-badge-group">
          {[author.id.replace("idref", ""), author.orcid]
            ?.filter((id) => id)
            .map((id, i) => <CopyBadge key={id} size="sm" copyText={id}>{(i === 0) ? 'idref' : 'orcid'} : {id}</CopyBadge>)
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