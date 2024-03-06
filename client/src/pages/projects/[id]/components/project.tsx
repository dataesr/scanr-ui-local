import cs from "classnames";
import { Badge, BadgeGroup, Button, ButtonGroup, Col, Container, Link, Notice, Row, Tab, Tabs, Text, Title, useDSFRConfig } from "@dataesr/dsfr-plus";
import { Project } from "../../../../types/project";
import CopyBadge from "../../../../components/copy/copy-badge";
import { PageContent, PageSection } from "../../../../components/page-content";
import Map from "../../../../components/map";
import Truncate from "../../../../components/truncate";
import LinkCard from "../../../../components/link-card";
import { useIntl } from "react-intl";

function calculateAccomplishment(startDate, endDate) {
  if (!startDate || !endDate) return null;
  const _startDate = new Date(startDate);
  const _endDate = new Date(endDate);
  const currentDate = new Date();
  const totalDuration = _endDate.getTime() - _startDate.getTime();
  const elapsedDuration = currentDate.getTime() - _startDate.getTime();
  const percentAccomplishment = Math.floor((elapsedDuration / totalDuration) * 100);
  if (percentAccomplishment < 0) return 0;
  if (percentAccomplishment > 100) return 100;
  return percentAccomplishment;
}

const typeLogoMapping = {
  anr: 'https://scanr.enseignementsup-recherche.gouv.fr/img/logos/logo-anr.svg',
  h2020: 'https://scanr.enseignementsup-recherche.gouv.fr/img/logos/logo-europe.svg',
  fp7: 'https://scanr.enseignementsup-recherche.gouv.fr/img/logos/logo-fp7.svg',
}

const frenchFirstSorter = (a) => {
  if (a?.structure?.mainAddress?.country === "France") return -1;
  return 1;
}

const getParticipants = (type, participants) => {
  if (type !== "H2020") return participants;
  return participants
    .filter((part) => part.label?.default?.slice(-1) === "0")
    .sort(frenchFirstSorter);
}

const getSubParticipants = (type, participants, id) => {
  if (type !== "H2020") return null;
  console.log("LOGGER", id, participants.filter((part) => part.label?.default?.slice(-1) !== "0"));

  return participants.filter((part) => part.label.default.split('__')[2].slice(0, -2) === id && part.label.default.slice(-1) !== "0");
}

export default function ProjectPresentation({ data }: { data: Project }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();

  const markers = data?.participants
    ?.filter(({ structure }) => structure?.mainAddress?.gps?.lat && structure?.mainAddress?.gps?.lon)
    .map(({ structure }) => ({
      latLng: [structure?.mainAddress?.gps?.lat, structure?.mainAddress?.gps?.lon],
      address: `${structure.mainAddress?.address},
          ${structure.mainAddress?.postcode}, ${structure.mainAddress?.city},
          ${structure.mainAddress?.country}`,
    }))

  const state = (data.endDate)
    ? (new Date(data.endDate) < new Date()) ? ' terminé' : ' en cours'
    : null;

  const accomplishment = calculateAccomplishment(data.startDate, data.endDate);
  const fundingPercent = (data.budgetTotal && data.budgetFinanced)
    ? Math.floor(data.budgetFinanced / data.budgetTotal * 100)
    : null;


  const logoUrl = typeLogoMapping[data.type?.toLowerCase()] || null;


  const coordinator = data?.participants?.find((part) => ['coordinator', 'coordinateur'].includes(part.role));

  const participantsWithSubParticipants = getParticipants(data.type, data.participants).map((part) => {
    console.log("LOGGER1", part.label.default.split('__')[2]?.slice(0, -2));

    const subParticipants = getSubParticipants(data.type, data.participants, part.label.default.split('__')[2]?.slice(0, -2));
    return { ...part, subParticipants };
  });




  return (
    <>
      <Container fluid>
        <Row gutters>
          <Col xs="12" md="8">
            <Container fluid className="fr-mb-8w">
              <div style={{ display: "flex", flexWrap: "nowrap" }} className="fr-my-1v">
                <div style={{ flexGrow: 1 }}>
                  <BadgeGroup className="structure-badge-list fr-mt-1v">
                    <Badge size="sm" color='green-emeraude'>{data.type}</Badge>
                  </BadgeGroup>
                  <Title className="fr-mb-0" as="h1" look="h4">
                    {data.label?.[locale] || data.label.default || data.label.fr || data.label.en}
                    {data?.acronym && (
                      <span>
                        {' '}
                        ({data.acronym?.[locale] || data.acronym.default || data.acronym.fr || data.acronym.en})
                      </span>
                    )}
                  </Title>
                  {data?.year && (<Text className="fr-card__detail" size="sm">
                    <i>Financement obtenu en {data.year}</i>
                  </Text>)}
                </div>
                {logoUrl && (<div>
                  <img
                    style={{ maxHeight: "100px" }}
                    width="auto"
                    height="auto"
                    src={logoUrl}
                    alt={`Logo ${data.type}`}
                    className="fr-mr-1v" />
                </div>)}
              </div>
              <Truncate lines={6} className="fr-mt-2w">
                <Text size="sm" className="fr-mb-0">
                  {data.description?.[locale] || data.description?.default || data.description?.fr || data.description?.en}
                </Text>
              </Truncate>
            </Container>
            <PageContent>
              <PageSection size="lead" show title={intl.formatMessage({ id: "projects.section.programs" })} description="">
                <Notice type="info" closeMode="disallow">
                  Ici seront listés les appels à projets et programmes du projet.
                </Notice>
              </PageSection>
              <PageSection size="lead" show title={intl.formatMessage({ id: "projects.section.participants" })} description="">
                <Row gutters>
                  <Col xs="12">
                    {
                      participantsWithSubParticipants.map((part, i) => (
                        <div key={i} className={cs("fr-mb-2w", { "fr-border-bottom": i < participantsWithSubParticipants.length - 1 })}>
                          <LinkCard type="organization" icon="building-line">
                            <Text className="fr-m-0">
                              {
                                part.structure?.id ? (
                                  <Link href={`/organizations/${part.structure?.id}`}>
                                    {part.structure?.label?.default}
                                  </Link>
                                ) : part.label?.default?.split('__')[0]
                              }
                              {part.funding && <Text className="fr-card__detail" size="sm">
                                <i>
                                  Financé à hauteur de {Number(part.funding.split(',')[0]).toLocaleString()} €
                                </i>
                              </Text>}
                            </Text>
                          </LinkCard>
                          {part.subParticipants?.map((subPart, j) => (
                            <div key={j} className="fr-ml-10w">
                              <LinkCard type="organization" icon="community-fill">
                                <Text className="fr-card__detail" size="sm">
                                  <i>
                                    Co-participant
                                  </i>
                                </Text>
                                <Text className="fr-m-0">
                                  {
                                    subPart.structure?.id ? (
                                      <Link href={`/organizations/${subPart.structure?.id}`}>
                                        {subPart.structure?.label?.default}
                                      </Link>
                                    ) : subPart.label?.default?.split('__')[0]
                                  }
                                </Text>
                                {part.funding && <Text className="fr-card__detail" size="sm">
                                  <i>
                                    Financé à hauteur de {Number(part.funding.split(',')[0]).toLocaleString()} €
                                  </i>
                                </Text>}
                              </LinkCard>
                            </div>
                          ))}
                        </div>
                      ))
                    }
                  </Col>
                  {markers.length ? (<Col xs="12">
                    <div style={{ height: "400px", width: "100%" }}>
                      <Map markers={markers} height={data?.participants.length > 2 ? "100%" : "200px"} width="100%" />
                    </div>
                  </Col>) : null}
                </Row>
              </PageSection>
              <PageSection size="lead" show title={intl.formatMessage({ id: "projects.section.publications" })} description="">
                <Notice type="info" closeMode="disallow">
                  Publications du projet
                </Notice>
              </PageSection>
            </PageContent>
          </Col>
          <Col xs="12" md="4" xl="3" offsetXl="1">
            <PageContent>
              <PageSection show title="Etat du projet" description={state
                ? `Ce projet est ${state} depuis le ${state === ' terminé' ? new Date(data.endDate).toLocaleDateString() : new Date(data.startDate).toLocaleDateString()}`
                : 'Aucune information disponible'}>
                {accomplishment && (<div style={{ padding: "1rem .5rem" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: 'visible' }}
                    width="100%"
                    height="10px"
                  >
                    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                      <g>
                        <text
                          x="0"
                          y="-10"
                          fill='var(--text-mention-grey)'
                          stroke="none"
                          text-anchor="start"
                          font-size=".75rem"
                        >
                          {new Date(data.startDate).toLocaleDateString()}
                        </text>
                        <text
                          x="100%"
                          y="-10"
                          fill='var(--text-mention-grey)'
                          stroke="none"
                          text-anchor="end"
                          font-size=".75rem"
                        >
                          {new Date(data.endDate).toLocaleDateString()}
                        </text>
                        {data.duration && (<text
                          x="50%"
                          y="-10"
                          fill='var(--text-mention-grey)'
                          stroke="none"
                          text-anchor="middle"
                          font-size=".75rem"
                        >
                          {data.duration}
                          {' '}
                          mois
                        </text>)}
                        <rect
                          height="10px"
                          width="100%"
                          x="0"
                          y="0"
                          fill='var(--background-contrast-grey)'
                          rx="4"
                          ry="4"
                        />
                        <rect
                          height="10px"
                          width={`${accomplishment}%`}
                          x="0"
                          y="0"
                          fill='var(--background-contrast-pink-macaron-active)'
                          rx="4"
                          ry="4"
                        />
                        <circle r="2" cx="100%" cy="5" fill='var(--text-mention-grey)' stroke='none' transform="translate(-4,0)" />
                        <circle r="2" cx="5" cy="5" fill='var(--text-mention-grey)' stroke='none' />
                        <circle r="4" cx={`${accomplishment}%`} cy="5" fill='var(--text-mention-grey)' stroke='none' transform="translate(-4,0)" />
                      </g>
                    </g>
                  </svg>
                </div>)}
              </PageSection>
              <PageSection
                title={intl.formatMessage({ id: "projects.section.funding.title" })}
                description={(<Text className="fr-mb-0" size="xs">
                  {(!data.budgetTotal && !data.budgetFinanced) && intl.formatMessage({ id: "projects.section.funding.no-data" })}
                  {data.budgetTotal && (
                    <>
                      {intl.formatMessage({ id: "projects.section.funding.global-budget" })}
                      <b>
                        {Math.floor(Number(data.budgetTotal)).toLocaleString()} €
                      </b>
                    </>
                  )}
                  <br />
                  {data.budgetFinanced && (
                    <>
                      {intl.formatMessage({ id: "projects.section.funding.contributed-budget" })}
                      <b>
                        {Math.floor(Number(data.budgetFinanced)).toLocaleString()} €
                      </b>
                    </>
                  )}
                </Text>)}
                show
              >
                {fundingPercent && (<div style={{ padding: "1rem .5rem" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: 'visible' }}
                    width="100%"
                    height="10px"
                  >
                    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                      <g>
                        {fundingPercent && (<text
                          x={`${fundingPercent}%`}
                          y="-10"
                          fill='var(--text-mention-grey)'
                          stroke="none"
                          text-anchor={(fundingPercent > 80) ? "end" : (fundingPercent < 20) ? "start" : "middle"}
                          font-size=".75rem"
                        >
                          {intl.formatMessage({ id: "projects.section.funding.financed-at" })}
                          {' '}
                          {fundingPercent.toLocaleString()}
                          {' '}
                          %
                        </text>)}
                        <rect
                          height="10px"
                          width="100%"
                          x="0"
                          y="0"
                          fill='var(--background-contrast-grey)'
                          rx="4"
                          ry="4"
                        />
                        <rect
                          height="10px"
                          width={`${fundingPercent}%`}
                          x="0"
                          y="0"
                          fill='var(--background-contrast-green-emeraude-active)'
                          rx="4"
                          ry="4"
                        />
                        <circle r="2" cx="100%" cy="5" fill='var(--text-mention-grey)' stroke='none' transform="translate(-4,0)" />
                        <circle r="4" cx={`${fundingPercent}%`} cy="5" fill='var(--text-mention-grey)' stroke='none' transform="translate(-4,0)" />
                      </g>
                    </g>
                  </svg>
                </div>)}
              </PageSection>
              <PageSection
                title={intl.formatMessage({ id: "projects.section.coordinator.title" })}
                show={!!coordinator}
              >
                <LinkCard type="organization" icon="building-line">
                  <Text className="fr-m-0">
                    {
                      coordinator?.structure?.id ? (
                        <Link href={`/organizations/${coordinator.structure?.id}`}>
                          {coordinator?.structure?.label?.default}
                        </Link>
                      ) : coordinator?.label?.default?.split('__')[0]
                    }
                  </Text>
                </LinkCard>
              </PageSection>
              <PageSection
                title={intl.formatMessage({ id: "projects.section.identifiers.title" })}
                description={intl.formatMessage({ id: "projects.section.identifiers.desc" })}
                show={!!data?.id}
              >
                <div>
                  <div className="fr-badge-group">
                    <CopyBadge lowercase size="sm" copyText={data.id}>{data.id}</CopyBadge>
                  </div>
                </div>
              </PageSection>
              {data.url && (<PageSection title={intl.formatMessage({ id: "projects.section.website.title" })} description="" show={!!data?.url}>
                <div className="fr-follow">
                  <div className="fr-container">
                    <div className="fr-grid-row">
                      <div className="fr-col-12">
                        <div className="fr-follow__social">
                          <ul className="fr-btns-group">
                            <li style={{ width: "100%" }}>
                              <a
                                className="fr-btn--links fr-btn social-btn"
                                href={data.url}
                                target="_blank"
                                rel="noreferrer noopener external"
                              >
                                {intl.formatMessage({ id: "projects.section.website.name" })}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PageSection>)}
              <PageSection
                title={intl.formatMessage({ id: "projects.section.contribute.title" })}
                show
              >
                <ButtonGroup>
                  <Button
                    as="a"
                    href={`/bugs/projects/${data.id}`}
                    color="error"
                    variant="tertiary"
                    icon="bug-line"
                    iconPosition="left"
                  >
                    {intl.formatMessage({
                      id: "projects.section.contribute.bugs",
                    })}
                  </Button>
                </ButtonGroup>
              </PageSection>
            </PageContent>
          </Col>
        </Row >
      </Container >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}