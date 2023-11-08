import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, BreadcrumbItem, Container } from "@dataesr/react-dsfr";
import { getAuthorById } from "../../../api/authors";
import AuthorSkeleton from "./components/skeleton";
import AuthorPresentation from "./components/author";

export default function Author() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["author", id],
    queryFn: () => getAuthorById(id),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (isError) {
    return <Container>Error</Container>;
  }
  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
        <BreadcrumbItem href="/search/authors">Auteurs</BreadcrumbItem>
        <BreadcrumbItem>
          {data?.fullName}
        </BreadcrumbItem>
      </Breadcrumb>
      {(isLoading || !data) && <AuthorSkeleton />}
      {(data?.id) && <AuthorPresentation data={data} />}
    </Container>
  )
}