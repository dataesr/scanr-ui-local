import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Container, Link } from "@dataesr/dsfr-plus";
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
        <Link href="/">Accueil</Link>
        <Link href="/search/publications">Publications</Link>
        <Link current>
          {data?.title?.default?.slice(0, 80)}
          {(data?.title?.default?.length > 80) ? ' ...' : ''}
          {!data?.title?.default && <BaseSkeleton width="180px" height="1rem" />}
        </Link>
      </Breadcrumb>
      {(isLoading || !data) && <PublicationSkeleton />}
      {(data && data?.productionType === "thesis") && <These data={data} />}
      {(data && data?.productionType !== "thesis") && <Publication data={data} />}
    </Container>
  )
}