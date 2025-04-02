import { useIntl } from "react-intl";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Text,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { Organization, RelatedOrganizationData } from "../../../../types/organization";
import { PageContent, PageSection } from "../../../../components/page-content";
import OrganizationPublications from "./publications";
import OrganizationProjects from "./projects";
import OrganizationPatents from "./patents";
import Websites from "../../../../components/websites";
import SocialMedias from "../../../../components/social-medias";
import Share from "../../../../components/share";
import OrganizationLocalizations from "./localizations";
import OrganizationLeaders from "./leaders";
import { OrganizationNetworks, OrganizationNetworksBadges } from "./networks";
import useScreenSize from "../../../../hooks/useScreenSize";
import OrganizationHeader from "./header";
import Identifiers from "../../../../components/identifiers";
import MoreLikeThis from "../../../../components/more-like-this"
import getLangFieldValue from "../../../../utils/lang"
import OrganizationAgreements from "./agreements";
import OrganizationAwards from "./awards";
import OrganizationNetwork from "./network"
import BarLink from "../../../../components/bar-link";
import Modal from "../../../../components/modal";

const NETWORK_BADGES_CODES = [
  "carnot",
  "gican",
  "gifas",
  "gicat",
  "rescurie",
  "itagricole",
  "irt",
  "polecompetitivite",
  "satt",
]

type TutelleCountsType = {
  structure: string,
  count: number,
  label: string,
  relationType: string,
  normalizedCount: number
}

type ForType = "participant" | "tutelle";

const groupByIntitutions = (orgId: string, data: RelatedOrganizationData[], forWho: ForType) => {
  const filterCallback = (element: RelatedOrganizationData) => {
    if (forWho === "participant") return !["établissement tutelle", "primary"].includes(element.relationType);
    if (forWho === "tutelle") return ["établissement tutelle", "primary"].includes(element.relationType);
    return !!element;
  };
  const count = data
    ?.filter((element) => filterCallback(element))
    ?.flatMap(({ denormalized }) => denormalized.institutions)
    ?.filter((institution) => institution.structure !== orgId)
    ?.reduce((acc, current) => {
      if (!["établissement tutelle", "primary"].includes(current.relationType)) return acc;
      const existing = acc.find(item => item.structure === current.structure);

      if (existing) {
        existing.count += 1;
      } else {
        acc.push({
          structure: current.structure,
          count: 1,
          label: current.label,
          relationType: current.relationType,
          normalizedCount: null,
        });
      }

      return acc;
    }, [] as TutelleCountsType[])
  const maxCount = count?.length ? Math.max(...count.map(i => i.count)) : 0;
  const res = count?.map((item) => ({
    ...item,
    normalizedCount: maxCount > 0 ? (item.count / maxCount) * 100 : 0
  })).sort((a, b) => b.count - a.count);
  return res ?? [];
}




export default function OrganizationPresentation({ data }: { data: Organization }) {
  const { locale } = useDSFRConfig()
  const intl = useIntl()
  const { publications, projects, patents, network } = data
  const { screen } = useScreenSize()
  const networkBadges = data.badges?.filter((b) => NETWORK_BADGES_CODES.includes(b.code.toLowerCase()))

  const coInstitutionOf = groupByIntitutions(data.id, data.institutionOf, "tutelle")
  const coParticipantsOf = groupByIntitutions(data.id, data.institutionOf, "participant")

  const propre = data?.institutionOf
    ?.filter((element) => ["établissement tutelle", "primary"].includes(element.relationType))
    ?.filter((element) => element.denormalized.institutions.length === 1 && element.denormalized.institutions[0].structure === data.id)
  const notPropre = data?.institutionOf
    ?.filter((element) => ["établissement tutelle", "primary"].includes(element.relationType))
    ?.filter((element) => !(element.denormalized.institutions.length === 1 && element.denormalized.institutions[0].structure === data.id))


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
                  size="lead"
                  title={intl.formatMessage({
                    id: "organizations.section.agreements.title",
                  })}
                  show={!!data?.agreements?.length}
                >
                  <OrganizationAgreements agreements={data?.agreements} />
                </PageSection>
                <PageSection
                  size="lead"
                  title={intl.formatMessage({
                    id: "organizations.section.awards.title",
                  })}
                  show={!!data?.awards?.length}
                >
                  <OrganizationAwards awards={data?.awards} />
                </PageSection>
                <PageSection
                  size="lead"
                  icon="team-line"
                  title={intl.formatMessage({
                    id: "organizations.section.leaders.title",
                  })}
                  show={!!data?.leaders?.length}
                >
                  <OrganizationLeaders data={data?.leaders} />
                </PageSection>
                <PageSection
                  size="lead"
                  icon="git-branch-line"
                  title={intl.formatMessage({
                    id: "organizations.section.networks.title",
                  })}
                  show={
                    !!(
                      data?.institutions?.length ||
                      data?.relations?.length ||
                      data?.institutionOf?.length ||
                      data?.relationOf?.length ||
                      data.parents?.length ||
                      data.parentOf?.length ||
                      networkBadges?.length
                    )
                  }
                >
                  <OrganizationNetworks
                    data={data.institutions?.filter((institution) =>
                      ["établissement tutelle", "primary"].includes(institution.relationType)
                    )}
                    titleKey="organizations.section.networks.supervisors.title"
                    icon="building-line"
                  />
                  <OrganizationNetworks
                    data={data.institutionOf?.filter((institution) =>
                      ["établissement tutelle", "primary"].includes(institution.relationType)
                    )}
                    titleKey="organizations.section.networks.supervise.title"
                    icon="building-line"
                  />
                  {!!data?.institutionOf?.length && <div
                    className="fr-ml-2w fr-pl-2w fr-mb-3w fr-pb-2w"
                    style={{ marginTop: "-1.5rem", borderLeft: "4px solid var(--artwork-minor-yellow-tournesol)" }}
                  >
                    <div style={{ marginTop: "-1.5rem" }}>
                      <OrganizationNetworks
                        data={propre}
                        titleKey="organizations.section.networks.supervise.propre.title"
                        icon="building-line"
                      />
                    </div>
                    <div style={{ marginTop: "-1.5rem" }}>
                      <OrganizationNetworks
                        data={notPropre}
                        titleKey="organizations.section.networks.supervise.notPropre.title"
                        icon="building-line"
                      />
                    </div>
                    {!!coInstitutionOf?.length && (
                      <div style={{ marginTop: "-1.5rem" }}>
                        <div className="fr-mb-1w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ flexGrow: 1 }}>
                            <Text bold className="fr-m-0">
                              Top 5 des cotutelles
                              {/* {intl.formatMessage(
                                { id: titleKey },
                                { count: data.length }
                              )} */}
                            </Text>
                          </div>
                          <Button
                            variant="text"
                            icon="arrow-right-s-line"
                            iconPosition="right"
                            aria-controls="{top5}"
                            data-fr-opened="false"
                          >
                            {/* {intl.formatMessage({ id: "organizations.section.networks.open-modal-button" })} */}
                            Afficher plus de co-tutelles
                          </Button>
                        </div>
                        <Col xs="12">
                          {coInstitutionOf?.slice(0, 5)?.map((institution) => (
                            <BarLink
                              key={institution.structure}
                              name={institution.label}
                              count={institution.count}
                              width={institution.normalizedCount}
                              color="var(--artwork-minor-yellow-tournesol)"
                              height={8}
                              href={`/organizations/${institution.structure}`}
                            />
                          ))}
                        </Col>
                        <Modal id="{top5}" size="lg" title="top5">
                          <Col xs="12">
                            {coInstitutionOf?.map((institution) => (
                              <BarLink
                                key={institution.structure}
                                name={institution.label}
                                count={institution.count}
                                width={institution.normalizedCount}
                                color="var(--artwork-minor-yellow-tournesol)"
                                height={8}
                                href={`/organizations/${institution.structure}`}
                              />
                            ))}
                          </Col>
                        </Modal>
                      </div>

                    )}
                  </div>}

                  <OrganizationNetworks
                    data={data.institutions?.filter(
                      (institution) => !["établissement tutelle", "primary"].includes(institution.relationType)
                    )}
                    titleKey="organizations.section.networks.participants.title"
                    icon="building-line"
                  />
                  <OrganizationNetworks
                    data={data.institutionOf?.filter(
                      (institution) => !["établissement tutelle", "primary"].includes(institution.relationType)
                    )}
                    titleKey="organizations.section.networks.participate-to.title"
                    icon="building-line"
                  />
                  {!!coParticipantsOf?.length && (
                    <div className="fr-ml-2w fr-pl-2w fr-mb-3w fr-pb-2w" style={{ marginTop: "-1.5rem", borderLeft: "4px solid var(--artwork-minor-yellow-tournesol)" }}>
                      <div style={{ marginTop: "-1.5rem" }}>
                        <div className="fr-mb-1w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ flexGrow: 1 }}>
                            <Text bold className="fr-m-0">
                              Top 5 des tutelles de ces laboratoires
                              {/* {intl.formatMessage(
                                { id: titleKey },
                                { count: data.length }
                              )} */}
                            </Text>
                          </div>
                          <Button
                            variant="text"
                            icon="arrow-right-s-line"
                            iconPosition="right"
                            aria-controls="{top6}"
                            data-fr-opened="false"
                          >
                            {/* {intl.formatMessage({ id: "organizations.section.networks.open-modal-button" })} */}
                            Afficher plus de tutelles
                          </Button>
                        </div>
                        <Col xs="12">
                          {coParticipantsOf?.slice(0, 5)?.map((institution) => (
                            <BarLink
                              key={institution.structure}
                              name={institution.label}
                              count={institution.count}
                              width={institution.normalizedCount}
                              color="var(--artwork-minor-yellow-tournesol)"
                              height={8}
                              href={`/organizations/${institution.structure}`}
                            />
                          ))}
                        </Col>
                        <Modal id="{top6}" size="lg" title="top5">
                          <Col xs="12">
                            {coParticipantsOf?.map((institution) => (
                              <BarLink
                                key={institution.structure}
                                name={institution.label}
                                count={institution.count}
                                width={institution.normalizedCount}
                                color="var(--artwork-minor-yellow-tournesol)"
                                height={8}
                                href={`/organizations/${institution.structure}`}
                              />
                            ))}
                          </Col>
                        </Modal>
                      </div>
                    </div>
                  )}
                  <OrganizationNetworks
                    data={data.parents}
                    titleKey="organizations.section.networks.groups.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.parentOf}
                    titleKey="organizations.section.networks.is-grouped.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relations?.filter((e) => e.type === "DS_LABS")}
                    titleKey="organizations.section.networks.doctoral-schools.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relationOf?.filter((e) => e.type === "DS_LABS")}
                    titleKey="organizations.section.networks.linked-to.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relations?.filter((e) => e.type === "satt_actionnaire")}
                    titleKey="organizations.section.networks.satt.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relationOf?.filter((e) => e.type === "satt_actionnaire")}
                    titleKey="organizations.section.networks.satt-of.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relations?.filter((e) => e.type === "incubateur_public")}
                    titleKey="organizations.section.networks.incubateur.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relationOf?.filter((e) => e.type === "incubateur_public")}
                    titleKey="organizations.section.networks.incubateur-of.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relations?.filter((e) => e.type === "membre_carnot")}
                    titleKey="organizations.section.networks.carnot.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relations?.filter((e) => e.type === "rachete_par")}
                    titleKey="organizations.section.networks.eaten.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relationOf?.filter((e) => e.type === "rachete_par")}
                    titleKey="organizations.section.networks.eat.title"
                    icon="community-fill"
                  />
                  {/*
                  TODO: Uncomment when the data is available
                  <OrganizationNetworks
                    data={data.relations?.filter(
                      (item) =>
                        (item.type || "").indexOf("spinoff") !== -1 || false
                    )}
                    titleKey="organizations.section.networks.spinnof.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relationOf?.filter(
                      (item) =>
                        (item.type || "").indexOf("spinoff") !== -1 || false
                    )}
                    titleKey="organizations.section.networks.spinnof-of.title"
                    icon="community-fill"
                  /> */}
                  <OrganizationNetworksBadges
                    data={networkBadges}
                    titleKey="organizations.section.networks.badges.title"
                    icon="links-fill"
                  />
                </PageSection>
                <PageSection
                  size="lead"
                  icon="heart-pulse-line"
                  title={intl.formatMessage({
                    id: "organizations.section.activities.title",
                  })}
                  show={!!(publications.publicationsCount || projects.projectsCount || patents.patentsCount)}
                >
                  <OrganizationPublications
                    data={publications}
                    value={data.id}
                    label={getLangFieldValue(locale)(data.label)}
                  />
                  <OrganizationNetwork data={network} value={data.id} label={getLangFieldValue(locale)(data.label)} />
                  <OrganizationProjects data={projects} value={data.id} label={getLangFieldValue(locale)(data.label)} />
                  <OrganizationPatents data={patents} value={data.id} label={getLangFieldValue(locale)(data.label)} />
                </PageSection>
                <PageSection
                  size="lead"
                  title={intl.formatMessage({
                    id: "organizations.section.more-like-this",
                  })}
                  icon="building-line"
                  show
                >
                  <MoreLikeThis id={data._id} api="organizations" />
                </PageSection>
                <PageSection title="Data JSON" description="" show={import.meta.env.DEV}>
                  <div>
                    <pre>{JSON.stringify(data || "", null, 2)}</pre>
                  </div>
                </PageSection>
              </PageContent>
            </Container>
          </Col>
          <Col xs="12" md="4" xl="3" offsetXl="1">
            <PageContent>
              <PageSection
                title={intl.formatMessage({
                  id: "organizations.section.localization.title",
                })}
                show={!!data.address?.length}
              >
                <OrganizationLocalizations data={data?.address} />
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "organizations.section.web.title",
                })}
                show={!!data?.links?.length}
              >
                <Websites data={data.links} />
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "organizations.section.social-medias.title",
                })}
                show={!!data?.socialMedias?.length}
              >
                <SocialMedias data={data?.socialMedias} />
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "organizations.section.identifiers.title",
                })}
                description={intl.formatMessage({ id: "organizations.copy" })}
                show={!!data?.externalIds?.length}
              >
                <Identifiers data={data?.externalIds} />
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "organizations.section.share.title",
                })}
                show
              >
                <Share />
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "organizations.section.contribute.title",
                })}
                show
              >
                <ButtonGroup>
                  <Button
                    as="a"
                    href={`/bugs/organizations/${data.id}`}
                    color="error"
                    variant="tertiary"
                    icon="bug-line"
                    iconPosition="left"
                  >
                    {intl.formatMessage({
                      id: "organizations.section.contribute.button-label",
                    })}
                  </Button>
                </ButtonGroup>
              </PageSection>
            </PageContent>
          </Col>
        </Row>
      </Container>
    </>
  )
}
