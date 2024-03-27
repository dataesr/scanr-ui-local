import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Text,
  Link,
  BadgeGroup,
  Badge,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { ItemProps } from "../../../types";
import { LightProject } from "../../../../../types/project";
import { getProjectById } from "../../../../../api/projects/[id]";
import getLangFieldValue from "../../../../../utils/lang";
import { RawIntlProvider, createIntl } from "react-intl";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

export default function ProjectItem({
  data: project,
  highlight,
}: ItemProps<LightProject>) {
  const queryClient = useQueryClient();
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });

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
    <RawIntlProvider value={intl}>
      <div className="result-item" key={project.id}>
        <BadgeGroup className="fr-mt-1v">
          <Badge size="sm" color="green-emeraude">
            {project.type}
          </Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetchAuthor(project.id)}>
          <Link href={`/projects/${project.id}`} className="fr-link">
            {highlight?.["label.default"]
              ? (<span dangerouslySetInnerHTML={{ __html: highlight?.["label.default"] }} />)
              : getLangFieldValue(locale)(project.label)}
          </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {shouldFilterParticipants && intl.formatMessage(
            { id: "project.item.participants.filtered" },
            { total: project.participants?.length, french: frenchParticipants?.length }
          )}
          {shouldFilterParticipants && <br />}
          {participants?.map((p, k) => (
            <Fragment key={k}>
              {(k > 0) ? ", " : ""}
              {p.structure?.label ? (
                <Link href={`/organizations/${p.structure.id}`}>
                  {getLangFieldValue(locale)(p.structure.label)}
                </Link>
              ) : <Text as="span">{p.label?.default?.split('__')?.[0]}</Text>}
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
    </RawIntlProvider>
  );
}
