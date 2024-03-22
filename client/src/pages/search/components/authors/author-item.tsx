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
          {[
            { id: author.id.replace("idref", ""), type: "idref" },
            { id: author.orcid, type: 'orcid' },
            { id: author.id_hal, type: 'idhal' }]
            .filter((identifier) => identifier.id)
            .map(({ id, type }) => <CopyBadge key={id} size="sm" copyText={id}>{type} : {id}</CopyBadge>)
          }
        </div>
        {Object.values(highlight || {}).map((value, i) => (
          <Text key={i} size="sm" className="fr-mb-0">
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </Text>
        ))}
      </div>
    </Fragment>
  )
}