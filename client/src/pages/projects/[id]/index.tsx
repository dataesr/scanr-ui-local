import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus";
import ProjectPresentation from "./components/project";
import { getProjectById } from "../../../api/projects";

export default function Project() {
  const { locale } = useDSFRConfig();
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => getProjectById(id),
  });
  if (isError) {
    return <Container>Error</Container>;
  }
  return (
    <Container>
      <Breadcrumb>
        <Link href="/">Accueil</Link>
        <Link href="/search/projects">Financements</Link>
        <Link>
          {data?.label?.[locale] || data?.label?.default || data?.label?.fr || data?.label?.en}
        </Link>
      </Breadcrumb>
      {(isLoading || !data) && "Loading..."}
      {(data?.id) && <ProjectPresentation data={data} />}
    </Container>
  )
}