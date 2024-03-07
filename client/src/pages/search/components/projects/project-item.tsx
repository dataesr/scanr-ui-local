import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Text,
  Link,
  BadgeGroup,
  Badge,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { ItemProps } from "../../types";
import { LightProject } from "../../../../types/project";
import { getProjectById } from "../../../../api/projects/[id]";
import getLangFieldValue from "../../../../utils/lang";

export default function ProjectItem({
  data: project,
  highlight,
}: ItemProps<LightProject>) {
  const queryClient = useQueryClient();
  const { locale } = useDSFRConfig();

  function prefetchAuthor(id: string) {
    queryClient.prefetchQuery({
      queryKey: ["project", id],
      queryFn: () => getProjectById(id),
      staleTime: Infinity,
    });
  }

  const frenchParticipants = project?.participants?.filter((el) =>
    el?.structure?.mainAddress?.country === "France"
  );

  const shouldFilterParticipants = project?.participants?.length > 4;
  const participants = shouldFilterParticipants
    ? frenchParticipants
    : project?.participants;

  return (
    <Fragment key={project.id}>
      <div className="result-item" key={project.id}>
        <BadgeGroup className="fr-mt-1v">
          <Badge size="sm" color="green-emeraude">
            {project.type}
          </Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetchAuthor(project.id)}>
          <Link href={`/projects/${project.id}`} className="fr-link">
            {project?.label?.default ||
              project?.label?.fr ||
              project?.label?.en}
          </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {shouldFilterParticipants &&
            `${project.participants?.length} participants dont ${frenchParticipants?.length} français`}
          {shouldFilterParticipants && <br />}
          {participants?.map((p, k) => (
            <Fragment key={k}>
              {(k > 0) ? ", " : ""}
              {p.structure?.label ? (
                <Link href={`/organizations/${p.structure.id}`}>
                  {getLangFieldValue(locale)(p.structure.label)}
                </Link>
              ) : <Text as="span">{p.label?.default.split('__')?.[0]}</Text>}
            </Fragment>
          ))}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>{project.year}</i>
        </Text>
        {Object.values(highlight || {}).map((value, i) => (
          <Text key={i} size="sm" className="fr-mb-0">
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </Text>
        ))}
      </div>
    </Fragment>
  );
}
