import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link, BadgeGroup, Badge, useDSFRConfig } from "@dataesr/dsfr-plus";
import { encode } from "../../../../utils/string";
import { ItemProps } from "../../types";
import { getOrganizationById } from "../../../../api/organizations";
import { Project } from "../../../../api/types/project";


export default function ProjectItem({ data: project, highlight }: ItemProps<Project>) {
  const queryClient = useQueryClient();
  const { locale } = useDSFRConfig()

  function prefetchAuthor(id: string) {
    queryClient.prefetchQuery({
      queryKey: ['project', id],
      queryFn: () => getOrganizationById(encode(id)),
      staleTime: Infinity,
    })
  }

  return (
    <Fragment key={project.id}>
      <div className="result-item" key={project.id}>
        <BadgeGroup className="fr-mt-1v">
          <Badge size="sm" color='green-emeraude'>{project.type}</Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetchAuthor(project.id)}><Link href={`/projects/${encode(project.id)}`} className="fr-link">
          {project?.label.default || project?.label.fr || project?.label.en}
        </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {project?.participants?.map(({ structure }, k) => (
            <Fragment key={k}>
              {(structure && k > 0) ? ', ' : ''}
              {(structure?.label) ? <Link href={`/authors/${encode(structure.id)}`}>{structure.label[locale] || structure.label.default}</Link> : null}
            </Fragment>
          ))}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {project.year}
          </i>
        </Text>
        {highlight?.["domains.label.default"] && (
          <Text size="sm" className="fr-mb-0">
            Mots clés:
            {' '}
            <span dangerouslySetInnerHTML={{ __html: highlight?.["domains.label.default"] }} />
          </Text>
        )}
        {highlight?.["publications.title.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["summary.default"] }} />
            ...
          </Text>
        )}
        {highlight?.["publications.summary.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["summary.default"] }} />
            ...
          </Text>
        )}
      </div>
    </Fragment>
  )
}