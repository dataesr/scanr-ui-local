import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link, BadgeGroup, Badge } from "@dataesr/dsfr-plus";
import { encode } from "../../../../utils/string";
import { ItemProps } from "../../types";
import { getOrganizationById } from "../../../../api/organizations/[id]";
import { LightOrganization } from "../../../../types/organization";


export default function OrganizationItem({ data: organization, highlight }: ItemProps<LightOrganization>) {
  const queryClient = useQueryClient();

  function prefetch(id: string) {
    queryClient.prefetchQuery({
      queryKey: ['organization', id],
      queryFn: () => getOrganizationById(encode(id)),
    })
  }

  return (
    <Fragment key={organization.id}>
      <div className="result-item" key={organization.id}>
        <BadgeGroup className="structure-badge-list fr-mt-1v">
          {organization.kind?.map((k) => <Badge key={k} size="sm" color="yellow-tournesol" noIcon>{k}</Badge>)}
          {organization.level && <Badge size="sm" color='yellow-tournesol'>{organization.level?.match(/\((.*?)\)/)?.[1] || organization.level}</Badge>}
        </BadgeGroup>
        <span onMouseEnter={() => prefetch(organization.id)}><Link href={`/organizations/${encode(organization.id)}`} className="fr-link">
          {highlight?.["label.default"]
            ? (<span dangerouslySetInnerHTML={{ __html: highlight?.["label.default"] }} />)
            : organization.label.default || organization.label?.fr || organization.label?.en}
        </Link>
        </span>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {organization.address?.find((a) => a.main).city}
          </i>
        </Text>
        {highlight?.["publications.title.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["publications.title.default"] }} />
            ...
          </Text>
        )}
        {highlight?.["publications.summary.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["publications.summary.default"] }} />
            ...
          </Text>
        )}
        {highlight?.["projects.title.default"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["publications.summary.default"] }} />
            ...
          </Text>
        )}
        {highlight?.["projects.title.en"] && (
          <Text size="sm" className="fr-mb-0">
            ...
            <span dangerouslySetInnerHTML={{ __html: highlight?.["publications.summary.default"] }} />
            ...
          </Text>
        )}
      </div>
    </Fragment>
  )
}