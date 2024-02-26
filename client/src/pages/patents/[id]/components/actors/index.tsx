import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthorById } from "../../../../../api/authors/[id]";
import LinkCard from "../../../../../components/link-card";
import { PatentActorsData } from "../../../../../types/patent";

function ActorsCard({ actors }: { actors: PatentActorsData }) {
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
      prefetch={actors.person ? () => prefetch(actors.person) : undefined}
      type="author"
      icon="user-line"
    >
      <Text className="fr-card__detail" size="sm">
        <i>{actors.rolePatent.map((el) => el.role)}</i>
      </Text>
      <Link className="fr-text--bold" href={`/authors/${actors.person}`}>
        {actors.fullName}
      </Link>
    </LinkCard>
  );
}

export default function PatentActors({
  data: actors,
}: {
  data: PatentActorsData[];
}) {
  if (!actors?.length) return null;
  return (
    <div className="fr-mb-3w">
      <Row gutters>
        {actors?.map((actors) => (
          <Col xs="12" md="12">
            <ActorsCard actors={actors} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
