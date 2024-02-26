import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link, BadgeGroup, Badge } from "@dataesr/dsfr-plus";
import { getPatentById } from "../../../../api/patents/[id]";
import { ItemProps } from "../../types";
import { Patent } from "../../../../types/patent";

export default function PatentItem({ data: patent }: ItemProps<Patent>) {
  const queryClient = useQueryClient();
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
  return (
    <Fragment key={patent.id}>
      <div className="result-item" key={patent.id}>
        <BadgeGroup className="structure-badge-list fr-mt-1v">
          <Badge size="sm" color="orange-terre-battue">
            Brevet
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
        <span onMouseEnter={() => prefetchPatent(patent.id)}>
          <i>{formatPublicationDate(patent.publicationDate)}</i>
        </span>
      </div>
    </Fragment>
  );
}
