import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Container, Link } from "@dataesr/dsfr-plus";
import { getAuthorById } from "../../../api/authors";
import AuthorSkeleton from "./components/skeleton";
import AuthorPresentation from "./components/author";

export default function Author() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["author", id],
    queryFn: () => getAuthorById(id),
  });
  if (isError) {
    return <Container>Error</Container>;
  }
  return (
    <Container>
      <Breadcrumb>
        <Link href="/">Accueil</Link>
        <Link href="/search/authors">Auteurs</Link>
        <Link>
          {data?.fullName}
        </Link>
      </Breadcrumb>
      {(isLoading || !data) && <AuthorSkeleton />}
      {(data?.id) && <AuthorPresentation data={data} />}
    </Container>
  )
}