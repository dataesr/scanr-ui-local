import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthorById } from "../../../../../api/authors/[id]";
import LinkCard from "../../../../../components/link-card";

export default function Author({ authors }) {
  const queryClient = useQueryClient();
  if (!authors.length) return null;
  const author = authors?.filter((author) => author.role === "author")?.[0];

  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["author", id],
      queryFn: () => getAuthorById(id),
    });
  }

  return (
    <Row gutters>
      <Col key={author.fullName} xs="12" md="6">
        <LinkCard
          prefetch={author.person ? () => prefetch(author.person) : undefined}
          type="author"
          icon="user-line"
        >
          {author.person ? (
            <Link className="fr-text--bold" href={`/authors/${author.person}`}>
              {author.fullName}
            </Link>
          ) : (
            <Text bold className="fr-m-0">
              {author.fullName}
            </Text>
          )}
        </LinkCard>
      </Col>
    </Row>
  );
}