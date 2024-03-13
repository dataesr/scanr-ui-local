import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthorById } from "../../../../../api/authors/[id]";
import LinkCard from "../../../../../components/link-card";
import { PatentActorsData } from "../../../../../types/patent";
import { useIntl } from "react-intl";

function ActorsCard({
  actor,
}: {
  actor: PatentActorsData;
  type: "inv" | "dep";
}) {
  const intl = useIntl();
  const queryClient = useQueryClient();

  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["author", id],
      queryFn: () => getAuthorById(id),
    });
  }

  const cardType = actor.typeParticipant === "pm" ? "organization" : "author";
  const iconType =
    actor.typeParticipant === "pm" ? "building-line" : "user-line";

  return (
    <LinkCard
      prefetch={actor.person ? () => prefetch(actor.person) : undefined}
      type={cardType}
      icon={iconType}
    >
      {actor.typeParticipant === "pm" && actor.affiliations.length > 0 ? (
        <Link
          className="fr-text--bold"
          href={`/organizations/${actor.affiliations[0]}`}
        >
          {actor.fullName}
        </Link>
      ) : (
        <Text bold className="fr-m-0">
          {actor.fullName}
        </Text>
      )}
      {actor.country && <Text className="fr-card__detail" size="sm">
        <i>
          {intl.formatMessage({ id: `${actor.country}` })}
        </i>
      </Text>}
    </LinkCard>
  );
}

export default function PatentActors({
  data: actors,
  type,
}: {
  data: PatentActorsData[];
  type: "inv" | "dep";
}) {
  const filteredActors = actors.filter((actor) =>
    actor.rolePatent.some((role) => role.role === type)
  );

  const uniqueActors = filteredActors.filter((actor1) =>
    filteredActors.every((actor2) => {
      if (actor1 === actor2) return true;
      return !actor2.fullName.includes(actor1.fullName);
    })
  );

  if (!uniqueActors.length) return null;

  return (
    <div>
      <Row gutters>
        {uniqueActors.map((actor, index) => (
          <Col xs="12" md="6" key={index}>
            <ActorsCard actor={actor} type={type} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
