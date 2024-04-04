import { Row, Col, Link, Text } from "@dataesr/dsfr-plus";
import LinkCard from "../../../../../components/link-card";
import { InventorData, ApplicantData } from "../../../../../types/patent";
import { useQueryClient } from "@tanstack/react-query";
import { getOrganizationById } from "../../../../../api/organizations/[id]";
import { getAuthorById } from "../../../../../api/authors/[id]";
import { useIntl } from "react-intl";

function PatentActors({
  actors,
}: {
  actors: (ApplicantData | InventorData)[];
}) {
  const queryClient = useQueryClient();
  const intl = useIntl();

  function prefetchOrganization(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["organization", id],
      queryFn: () => getOrganizationById(id),
    });
  }

  function prefetchAuthor(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["author", id],
      queryFn: () => getAuthorById(id),
    });
  }

  const groupedActors = actors.reduce((acc, actor) => {
    acc[actor.name] = (acc[actor.name] || []).concat(actor);
    return acc;
  }, {});

  return (
    <Row gutters>
      {Object.values(groupedActors).map((group, index) => {
        const actorToDisplay =
          (group as (ApplicantData | InventorData)[]).find(
            (actor) => actor.ids?.[0]?.type === "idref"
          ) || group[0];

        if (!actorToDisplay) return null;

        const organizationId = actorToDisplay.ids?.[0]?.id;
        const isOrganization = actorToDisplay.type === "organisation";
        const isUndefinedId =
          `/authors/${actorToDisplay?.ids?.[0]?.id}` === "/authors/undefined";

        return (
          <Col xs="12" md="6" key={index}>
            <LinkCard
              prefetch={
                organizationId && !isUndefinedId
                  ? () => {
                      prefetchOrganization(organizationId);
                      prefetchAuthor(organizationId);
                    }
                  : undefined
              }
              type={isOrganization ? "organization" : "author"}
              icon={isOrganization ? "building-line" : "user-line"}
            >
              {isUndefinedId ? (
                <Text className="fr-text--bold fr-m-0">
                  {actorToDisplay.name}
                </Text>
              ) : (
                <Link
                  href={
                    isOrganization
                      ? `/organizations/${organizationId}`
                      : `/authors/${actorToDisplay?.ids?.[0]?.id}`
                  }
                  className="fr-text--bold"
                >
                  {actorToDisplay.name}
                </Link>
              )}
              {actorToDisplay.country && (
                <Text className="fr-card__detail" size="sm">
                  <i>
                    {intl.formatMessage({ id: `${actorToDisplay.country}` })}
                  </i>
                </Text>
              )}
            </LinkCard>
          </Col>
        );
      })}
    </Row>
  );
}

export default PatentActors;
