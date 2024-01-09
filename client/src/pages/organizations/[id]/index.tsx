import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Container, Link } from "@dataesr/dsfr-plus";
import OrganizationSkeleton from "./components/skeleton";
import OrganizationPresentation from "./components/organization";
import { getOrganizationById } from "../../../api/organizations";

export default function Organization() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => getOrganizationById(id),
  });
  if (isError) {
    return <Container>Error</Container>;
  }
  return (
    <Container>
      <Breadcrumb>
        <Link href="/">Accueil</Link>
        <Link href="/search/authors">Structures</Link>
        <Link>
          {data?.label.default}
        </Link>
      </Breadcrumb>
      {(isLoading || !data) && <OrganizationSkeleton />}
      {(data?.id) && <OrganizationPresentation data={data} />}
    </Container>
  )
}