import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BadgeGroup, Badge, Text, Link } from "@dataesr/dsfr-plus";
import { publicationTypeMapping, encode } from "../../../../utils/string";
import { getPublicationById } from "../../../../api/publications";
import { Publication } from "../../../../api/types/publication";
import { ItemProps } from "../../types";


export default function PublicationItem({ data: publication, highlight }: ItemProps<Publication>) {
  const queryClient = useQueryClient();

  function prefetchPublication(id: string) {
    queryClient.prefetchQuery({
      queryKey: ['publication', id],
      queryFn: () => getPublicationById(encode(id)),
      staleTime: Infinity,
    })
  }
  return (
    <Fragment key={publication.id}>
      <div className="result-item" key={publication.id}>
        <BadgeGroup className="fr-mt-1v">
          <Badge size="sm" variant="info" noIcon>{publicationTypeMapping[publication.type] || "Autre"}</Badge>
          <Badge size="sm" color={publication.isOa ? 'green-emeraude' : 'pink-macaron'} icon={publication.isOa ? 'lock-unlock-fill' : 'lock-fill'}>
            {publication.isOa ? 'Accès ouvert' : 'Accès fermé'}
          </Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetchPublication(publication.id)}><Link href={`/publications/${encode(publication.id)}`} className="fr-link">
          {highlight?.["title.default"]
            ? (<span dangerouslySetInnerHTML={{ __html: highlight?.["title.default"] }} />)
            : publication.title.default || publication.title?.fr || publication.title?.en}
        </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {publication?.authors?.slice(0, 5).map((author, k) => (
            <Fragment key={k}>
              {(k > 0) ? ', ' : ''}
              {(author?.person) ? <Link href={`/authors/${encode(author.person)}`}>{author.fullName}</Link> : author.fullName}
            </Fragment>
          ))}
          {publication?.authors?.length > 5 && <Text bold as="span"><i>{' '}et al.</i></Text>}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {publication?.source?.title && `${publication?.source?.title}`}
            {publication?.source?.volume && `, ${publication.source?.volume}`}
            {publication?.source?.issue && ` (${publication.source?.issue})`}
            {(publication?.year && publication?.source?.title) && ", "}
            {publication?.year && `${publication.year}`}
            {publication?.source?.publisher && `, ${publication?.source?.publisher}`}
          </i>
        </Text>
        {highlight?.["domains.label.default"] && (
          <Text size="sm" className="fr-mb-0">
            Mots clés:
            {' '}
            <span dangerouslySetInnerHTML={{ __html: highlight?.["domains.label.default"] }} />
          </Text>
        )}
        {highlight?.["summary.default"] && (
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