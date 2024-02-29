import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
import { OrganizationLeaderData } from "../../../../../types/organization";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthorById } from "../../../../../api/authors/[id]";
import LinkCard from "../../../../../components/link-card";

function LeaderCard({ leader }: { leader: OrganizationLeaderData }) {
  const queryClient = useQueryClient();

  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["author", id],
      queryFn: () => getAuthorById(id),
    });
  }

  return (
    <LinkCard
      prefetch={leader.person ? () => prefetch(leader.person) : undefined}
      type="author"
      icon="user-line"
    >
      <Text className="fr-card__detail" size="sm">
        <i>{leader.role}</i>
      </Text>
      {leader.person ? (
        <Link className="fr-text--bold" href={`/authors/${leader.person}`}>
          {leader.firstName} {leader.lastName}
        </Link>
      ) : (
        <Text bold className="fr-m-0">
          {leader.firstName} {leader.lastName}
        </Text>
      )}
    </LinkCard>
  );
}

export default function OrganizationLeaders({
  data: leaders,
}: {
  data: OrganizationLeaderData[];
}) {
  if (!leaders?.length) return null;
  return (
    <div className="fr-mb-3w">
      <Row gutters>
        {leaders
          ?.filter((l) => l.role === "Directeur")
          ?.map((leader) => (
            <Col xs="12" md="6">
              <LeaderCard leader={leader} />
            </Col>
          ))}
      </Row>
      <Row gutters>
        {leaders
          ?.filter((l) => l.role !== "Directeur")
          ?.map((leader) => (
            <Col xs="12" md="6">
              <LeaderCard leader={leader} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
