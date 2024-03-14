import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
// import { useQueryClient } from "@tanstack/react-query";
// import { getAuthorById } from "../../../../../api/authors/[id]";
// import { getOrganizationById } from "../../../../../api/organizations/[id]";
import LinkCard from "../../../../../components/link-card";
import { PatentActorsData } from "../../../../../types/patent";
import { useIntl } from "react-intl";

function ActorsCard({ actor }: { actor: PatentActorsData }) {
  const intl = useIntl();
  // const queryClient = useQueryClient();

  // function prefetchAuthor(id: string) {
  //   if (!id) return;
  //   queryClient.prefetchQuery({
  //     queryKey: ["author", id],
  //     queryFn: () => getAuthorById(id),
  //   });
  // }

  // function prefetchOrganization(id: string) {
  //   if (!id) return;
  //   queryClient.prefetchQuery({
  //     queryKey: ["organization", id],
  //     queryFn: () => getOrganizationById(id),
  //   });
  // }

  const isPm = actor.typeParticipant === "pm";
  // const id = isPm ? actor.affiliations?.[0]?.siren : `idref${actor.affiliations?.[0]?.idref}`;
  // const prefetch = isPm ? prefetchOrganization : prefetchAuthor;

  return (
    <LinkCard
      // prefetch={id ? () => prefetch(id) : undefined}
      type={isPm ? "organization" : "author"}
      icon={isPm ? "building-line" : "user-line"}
    >
      {actor.affiliations.length > 0 ? (
        <Link
          className="fr-text--bold"
          href={`/${isPm ? 'organizations' : 'authors'}/${actor.affiliations[0]}`}
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
  ).map(({ typeParticipant, country, fullName, affiliations }) => {
    return {
      typeParticipant: typeParticipant,
      country: country,
      affiliations: affiliations,
      fullName: fullName,
    };
  });

  const uniqueActors = [...new Set(filteredActors.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));

  if (!uniqueActors.length) return null;

  return (
    <div>
      <Row gutters>
        {uniqueActors.map((actor, index) => (
          <Col xs="12" md="6" key={index}>
            <ActorsCard actor={actor} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
