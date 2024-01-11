import { useIntl } from "react-intl";
import { Col, Container, Row } from "@dataesr/dsfr-plus";
import { Organization } from "../../../../api/types/organization";
import { PageContent, PageSection } from "../../../../components/page-content";
import OrganizationPublications from "./publications";
import OrganizationProjects from "./projects";
import OrganizationPatents from "./patents";
import Websites from "../../../../components/websites";
import SocialMedias from "../../../../components/social-medias";
import Share from "../../../../components/share";
import OrganizationLocalizations from "./localizations";
import OrganizationLeaders from "./leaders";
import OrganizationNetworks from "./networks";
import useScreenSize from "../../../../hooks/useScreenSize";
import OrganizationHeader from "./header";
import OrganizationIdentifiers from "./identifiers";

export default function OrganizationPresentation({ data }: { data: Organization }) {
  const intl = useIntl();
  const { publications, projects, patents } = data
  const { screen } = useScreenSize();
  return (
    <>
      <Container fluid>
        <Row gutters={!["sm", "xs"].includes(screen)}>
          <Col xs="12" md="8">
            <Container fluid className="fr-mb-8w">
              <OrganizationHeader data={data} />
            </Container>
            <Container fluid>
              <PageContent>
                <PageSection
                  icon="team-line"
                  title={intl.formatMessage({ id: "organizations.section.leaders.title" })}
                  show={!!data?.leaders?.length}>
                  <OrganizationLeaders data={data?.leaders} />
                </PageSection>
                <PageSection
                  icon="git-branch-line"
                  title={intl.formatMessage({ id: "organizations.section.networks.title" })}
                  show={!!data?.institutions?.length || !!data?.relations?.length}
                >
                  <OrganizationNetworks
                    data={data.institutions?.filter((e) => ["établissement tutelle", "primary"].includes(e.relationType))}
                    title={intl.formatMessage({ id: "organizations.section.networks.supervisors.title" })}
                    icon="building-line"
                  />
                  <OrganizationNetworks
                    data={data.institutions?.filter((e) => !["établissement tutelle", "primary"].includes(e.relationType))}
                    title={intl.formatMessage({ id: "organizations.section.networks.participants.title" })}
                    icon="building-line"
                  />
                  <OrganizationNetworks
                    data={data.relations?.filter(((e) => e.type === "DS_LABS"))}
                    title={intl.formatMessage({ id: "organizations.section.networks.doctoral-schools.title" })}
                    icon="community-fill"
                  />
                </PageSection>
                <PageSection
                  icon="heart-pulse-line"
                  title={intl.formatMessage({ id: "organizations.section.activities.title" })}
                  show={!!(publications.publicationsCount || projects.projectsCount || patents.patentsCount)}
                >
                  <OrganizationPublications data={publications} id={data.id} />
                  <OrganizationProjects data={projects} id={data.id} />
                  <OrganizationPatents data={patents} id={data.id} />
                </PageSection>
                <PageSection title="Data JSON" description="" show>
                  <div>
                    <pre>
                      {JSON.stringify(data || "", null, 2)}
                    </pre>
                  </div>
                </PageSection>
              </PageContent>
            </Container>
          </Col>
          <Col xs="12" md="4" xl="3" offsetXl="1">
            <PageContent>
              <PageSection
                size="lg"
                title={intl.formatMessage({ id: "organizations.section.localization.title" })}
                show={!!data.address?.length}
              >
                <OrganizationLocalizations data={data?.address} />
              </PageSection>
              <PageSection
                size="lg"
                title={intl.formatMessage({ id: "organizations.section.web.title" })}
                show={!!data?.links?.length}
              >
                <Websites data={data.links} />
              </PageSection>
              <PageSection
                size="lg"
                title={intl.formatMessage({ id: "organizations.section.social-medias.title" })}
                show={!!data?.socialMedias?.length}
              >
                <SocialMedias data={data?.socialMedias} />
              </PageSection>
              <PageSection
                size="lg"
                title={intl.formatMessage({ id: "organizations.section.identifiers.title" })}
                description={intl.formatMessage({ id: "organizations.copy" })}
                show={!!data?.externalIds?.length}
              >
                <OrganizationIdentifiers data={data?.externalIds} />
              </PageSection>
              <PageSection
                size="lg"
                title={intl.formatMessage({ id: "organizations.section.share.title" })}
                show
              >
                <Share />
              </PageSection>
            </PageContent>
          </Col>
        </Row >
      </Container >
    </>
  )
}