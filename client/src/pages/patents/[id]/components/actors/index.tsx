import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthorById } from "../../../../../api/authors/[id]";
import LinkCard from "../../../../../components/link-card";
import { PatentActorsData } from "../../../../../types/patent";

function ActorsCard({
  actor,
}: {
  actor: PatentActorsData;
  type: "inv" | "dep";
}) {
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
  {
    console.log(actor);
  }

  return (
    <LinkCard
      prefetch={actor.person ? () => prefetch(actor.person) : undefined}
      type={cardType}
      icon={iconType}
    >
      <Text className="fr-card__detail" size="sm">
        <i>
          {actor.rolePatent.map((role) =>
            role.role === "dep" ? "Déposant " : "Inventeurs"
          )}
        </i>
      </Text>
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
  const actorsList = actors.filter((actor) =>
    actor.rolePatent.find((roleObj) => roleObj.role === type)
  );

  if (!actorsList?.length) return null;

  return (
    <div>
      <Row gutters>
        {actorsList.map((actor) => (
          <Col xs="12" md="6">
            <ActorsCard actor={actor} type={"inv"} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
