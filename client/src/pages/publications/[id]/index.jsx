import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, BreadcrumbItem, Container } from "@dataesr/react-dsfr";
import { getPublicationById } from "../../../api/publications";
import These from "./components/these";
import Publication from "./components/publication";
import PublicationSkeleton from "./components/skeleton";
import BaseSkeleton from "../../../components/skeleton/base-skeleton";

export default function Production() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["publication", id],
    queryFn: () => getPublicationById(id),
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
        <BreadcrumbItem href="/search/publications">Publications</BreadcrumbItem>
        <BreadcrumbItem>
          {data?.title?.default?.slice(0, 80)}
          {(data?.title?.default?.length > 80) ? ' ...' : ''}
          {!data?.title?.default && <BaseSkeleton width="180px" height="1rem" />}
        </BreadcrumbItem>
      </Breadcrumb>
      {(isLoading || !data) && <PublicationSkeleton />}
      {(data && data?.productionType === "thesis") && <These data={data} />}
      {(data && data?.productionType !== "thesis") && <Publication data={data} />}
    </Container>
  )
}