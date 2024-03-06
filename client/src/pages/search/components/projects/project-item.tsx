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
          {participants?.map(({ structure }, k) => (
            <Fragment key={k}>
              {structure && k > 0 ? ", " : ""}
              {structure?.label ? (
                <Link href={`/organizations/${structure.id}`}>
                  {structure.label[locale] || structure.label.default}
                </Link>
              ) : null}
            </Fragment>
          ))}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>{project.year}</i>
        </Text>
        {highlight?.["domains.label.default"] && (
          <Text size="sm" className="fr-mb-0">
            Mots clés:{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: highlight?.["domains.label.default"],
              }}
            />
          </Text>
        )}
        {highlight?.["publications.title.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span
              dangerouslySetInnerHTML={{
                __html: highlight?.["summary.default"],
              }}
            />
            ...
          </Text>
        )}
        {highlight?.["publications.summary.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span
              dangerouslySetInnerHTML={{
                __html: highlight?.["summary.default"],
              }}
            />
            ...
          </Text>
        )}
      </div>
    </Fragment>
  );
}
