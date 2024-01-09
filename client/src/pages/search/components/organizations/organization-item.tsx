import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link, BadgeGroup, Badge } from "@dataesr/dsfr-plus";
import { encode } from "../../../../utils/string";
import { ItemProps } from "../../types";
import { getOrganizationById } from "../../../../api/organizations";
import { Organization } from "../../../../api/types/organization";

export default function OrganizationItem({ data: organization, highlight }: ItemProps<Organization>) {
  const queryClient = useQueryClient();

  function prefetchAuthor(id: string) {
    queryClient.prefetchQuery({
      queryKey: ['organization', id],
      queryFn: () => getOrganizationById(encode(id)),
      staleTime: Infinity,
    })
  }

  return (
    <Fragment key={organization.id}>
      <div className="result-item" key={organization.id}>
        <BadgeGroup className="fr-mt-1v">
          {organization.kind?.map((k) => <Badge key={k} size="sm" variant="info" noIcon>{k}</Badge>)}
          {organization.level && <Badge size="sm" color='green-emeraude'>{organization.level}</Badge>}
          {organization.nature && <Badge size="sm" color='green-emeraude'>{organization.nature}</Badge>}
        </BadgeGroup>
        <span onMouseEnter={() => prefetchAuthor(organization.id)}><Link href={`/organizations/${encode(organization.id)}`} className="fr-link">
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
      </div>
    </Fragment>
  )
}