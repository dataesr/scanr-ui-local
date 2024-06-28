import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BadgeGroup, Badge, Text, Link } from "@dataesr/dsfr-plus";
import { publicationTypeMapping, encode } from "../../../../utils/string";
import { getPublicationById } from "../../../../api/publications/[id]";
import { LightPublication } from "../../../../types/publication";
import { ItemProps } from "../../types";
import { useIntl } from "react-intl";

export default function PublicationItem({
  data: publication,
  highlight,
}: ItemProps<LightPublication>) {
  const queryClient = useQueryClient();
  const intl = useIntl();

  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["publication", id],
      queryFn: () => getPublicationById(id),
    });
  }
  const directors =
    publication.authors?.filter((author) => author.role === "directeurthese") ||
    [];

  return (
    <Fragment key={publication.id}>
      <div className="result-item">
        <BadgeGroup className="fr-mt-1v">
          <Badge size="sm" color="purple-glycine" noIcon>
            {publicationTypeMapping[publication.type] ||
              intl.formatMessage({ id: "search.publications.other" })}
          </Badge>
          <Badge
            size="sm"
            color={publication.isOa ? "green-emeraude" : "pink-macaron"}
            icon={publication.isOa ? "lock-unlock-fill" : "lock-fill"}
          >
            {publication.isOa
              ? intl.formatMessage({ id: "search.publications.openAccess" })
              : intl.formatMessage({ id: "search.publications.closedAccess" })}
          </Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetch(publication.id)}>
          <Link
            href={`/publications/${encode(publication.id)}`}
            className="fr-link"
          >
            {highlight?.["title.default"] ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight["title.default"],
                }}
              />
            ) : (
              publication.title.default ||
              publication.title?.fr ||
              publication.title?.en
            )}
          </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {publication?.authors
            ?.filter(
              (author) =>
                !directors.some((director) => director.person === author.person)
            )
            .slice(0, 5)
            .map((author, index) => (
              <Fragment key={index}>
                {index > 0 && ", "}
                {author.person ? (
                  <Link href={`/authors/${encode(author.person)}`}>
                    {author.fullName}
                  </Link>
                ) : (
                  author.fullName
                )}
              </Fragment>
            ))}
          {publication?.authors?.length > 5 && (
            <Text bold as="span">
              <i> et al.</i>
            </Text>
          )}
          {!!directors.length &&
            intl.formatMessage({ id: "search.publication.thesis.directed" })}
          {directors.map((director, index) => (
            <Fragment key={index}>
              <Link href={`/authors/${encode(director.person)}`}>
                {director.fullName}
              </Link>
              {(directors.length === 2 && index === 0) ||
              index === directors.length - 2
                ? intl.formatMessage({
                    id: "search.publications.thesis.and",
                  })
                : index < directors.length - 1
                ? ", "
                : ""}
            </Fragment>
          ))}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {publication.source?.title && `${publication.source?.title}`}
            {publication.source?.volume && `, ${publication.source?.volume}`}
            {publication.source?.issue && ` (${publication.source?.issue})`}
            {publication.year && publication.source?.title && ", "}
            {publication.year && `${publication.year}`}
            {publication.source?.publisher &&
              `, ${publication.source?.publisher}`}
          </i>
        </Text>
        {Object.values(highlight || {}).map((value, i) => (
          <Text key={i} size="sm" className="fr-mb-0">
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </Text>
        ))}
      </div>
    </Fragment>
  );
}
