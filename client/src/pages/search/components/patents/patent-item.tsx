import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link, BadgeGroup, Badge } from "@dataesr/dsfr-plus";
import { getPatentById } from "../../../../api/patents/[id]";
import { ItemProps } from "../../types";
import { Patent } from "../../../../types/patent";
import { useIntl } from "react-intl";

export default function PatentItem({ data: patent }: ItemProps<Patent>) {
  const queryClient = useQueryClient();
  const intl = useIntl();

  function prefetchPatent(id: string) {
    queryClient.prefetchQuery({
      queryKey: ["patent", id],
      queryFn: () => getPatentById(id),
    });
  }
  const formatPublicationDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const numberOfDep = patent.authors.filter((author) => {
    return author.rolePatent.some((role) => role.role === "dep");
  }).length;

  const numberOfInv = patent.authors.filter((author) => {
    return author.rolePatent.some((role) => role.role === "inv");
  }).length;

  console.log(patent.patents.length);
  // const numberOfPatent =

  return (
    <Fragment key={patent.id}>
      <div className="result-item" key={patent.id}>
        <BadgeGroup>
          <Badge size="sm" color="purple-glycine">
            {intl.formatMessage({
              id: "search.top.patent.family.badge",
            })}
          </Badge>
          {patent.isInternational && (
            <Badge size="sm" color="blue-ecume" style={{ marginRight: "10px" }}>
              International
            </Badge>
          )}
          {patent.isOeb && (
            <Badge size="sm" color="blue-ecume" style={{ marginRight: "10px" }}>
              Office européen
            </Badge>
          )}
          <Badge
            size="sm"
            color="green-bourgeon"
            style={{ marginRight: "10px" }}
          >
            {`${patent.patents.length} ${
              patent.patents.length > 1
                ? intl.formatMessage({ id: "search.top.patent.badge_plural" })
                : intl.formatMessage({ id: "search.top.patent.badge_singular" })
            }`}
          </Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetchPatent(patent.id)}>
          <Link href={`/patents/${patent.id}`} className="fr-link">
            {patent.title.fr ? patent.title.fr : patent.title.en}
          </Link>
        </span>
        <Text bold as="span" size="sm" className="fr-card__detail fr-mb-0">
          {numberOfDep} déposants & {numberOfInv} inventeurs
        </Text>
        <Text
          size="sm"
          className="fr-card__detail fr-mb-0"
          onMouseEnter={() => prefetchPatent(patent.id)}
        >
          <i>
            Date de publication {formatPublicationDate(patent.publicationDate)}
          </i>
        </Text>
      </div>
    </Fragment>
  );
}
