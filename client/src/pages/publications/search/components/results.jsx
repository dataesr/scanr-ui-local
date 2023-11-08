import { useQueryClient } from "@tanstack/react-query";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { getPublicationById } from "../../../../api/publications";
import { encode, publicationTypeMapping } from "../../../../utils/string";
import { Badge, BadgeGroup, Link, Text } from "@dataesr/react-dsfr";
import { Fragment } from "react";
import Skeleton from "../../../../components/skeleton";

export default function PublicationResults({ publications }) {
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || "";
  const queryClient = useQueryClient();

  function prefetchPublication(id) {
    queryClient.prefetchQuery({
      queryKey: ['publication', id],
      queryFn: () => getPublicationById(encode(id)),
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })
  }
  if (!publications?.pages?.length) return <Skeleton />;
  return (
    <>
      <Text className="fr-mb-0" size='lead'>
        <strong>{publications.pages?.[0]?.total === 10000 ? 'Plus de 10000' : publications.pages?.[0]?.total} publications</strong> pour la recherche «{currentQuery}»
      </Text>
      <Text size="sm" className="fr-mb-4w">
        Comment faire une
        <Link as={<RouterLink to="/faq" />}>
          {' '}
          recherche avancée
          {' '}
        </Link>
        sur scanR ?
      </Text>
      <section>
        {publications.pages.flatMap((page) => page.data).map(({ _source: publication, highlight }) => (
          <Fragment key={publication.id}>
            <hr />
            <div className="fr-mb-3w" key={publication.id}>
              <BadgeGroup className="fr-mt-1v">
                <Badge isSmall type="info" noIcon text={publicationTypeMapping[publication.type] || "Autre"} />
                <Badge className="fr-pl-2w" isSmall type={publication.isOa ? 'success' : 'error'} icon={publication.isOa ? 'ri-lock-unlock-line' : 'ri-lock-line'} text={""} />
              </BadgeGroup>
              <span onMouseEnter={() => prefetchPublication(publication.id)}><Link as={<RouterLink to={`/publications/${encode(publication.id)}`} />} className="fr-link">
                {highlight?.["title.default"]
                  ? (<span dangerouslySetInnerHTML={{ __html: highlight?.["title.default"] }} />)
                  : publication.title.default || publication.title?.fr || publication.title?.en}
              </Link>
              </span>
              <Text bold size="sm" className="fr-mb-0">
                {publication?.authors?.map((author, k) => (
                  <Fragment key={k}>
                    {(k > 0) ? ', ' : ''}
                    {(author?.person) ? <Link as={<RouterLink to={`/authors/${encode(author.person)}`} />}>{author.fullName}</Link> : author.fullName}
                  </Fragment>
                ))}
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
                  {/* {highlight?.["summary.default"].map(s => highlighter(s, ' ... '))} */}
                  ...
                </Text>
              )}
            </div>

          </Fragment>
        ))}
      </section>
    </>
  )
}