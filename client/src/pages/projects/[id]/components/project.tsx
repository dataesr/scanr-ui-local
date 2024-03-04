import cs from "classnames";
import { Badge, BadgeGroup, Button, ButtonGroup, Col, Container, Link, Notice, Row, Tab, Tabs, Text, Title, useDSFRConfig } from "@dataesr/dsfr-plus";
import { Project } from "../../../../types/project";
import CopyBadgeButton from "../../../../components/copy/copy-badge-button";
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
export default function ProjectPresentation({ data }: { data: Project }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();

  const markers = data?.participants
    .map((p) => p?.structure?.address?.find((a) => a?.main))
    .filter((a) => (a?.gps?.lat && a?.gps?.lon))
    .map((address) => ({
      latLng: [address?.gps?.lat, address?.gps?.lon],
      address: `${address?.address},
          ${address?.postcode}, ${address?.city},
          ${address?.country}`,
    }))

  const state = (data.endDate)
    ? (new Date(data.endDate) < new Date()) ? ' terminé' : ' en cours'
    : null;

  const accomplishment = calculateAccomplishment(data.startDate, data.endDate);
  const fundingPercent = (data.budgetTotal && data.budgetFinanced)
    ? Math.floor(data.budgetFinanced / data.budgetTotal * 100)
    : null;


  const logoUrl = typeLogoMapping[data.type?.toLowerCase()] || null;

  const coordinator = data?.participants?.find((part) => part.role === 'coordinator');


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
            <Container fluid className="fr-mb-8w">
              <Row className="fr-my-3w">
                <Title className="fr-mb-0" as="h2" look="h4">
                  {intl.formatMessage({ id: "projects.section.programs" })}
                </Title>
              </Row>
              <Text>
                <Notice type="info" closeMode="disallow">
                  Ici seront listés les appels à projets et programmes du projet.
                </Notice>
              </Text>
            </Container>
            <Container fluid className="fr-mb-8w">
              <Row className="fr-my-3w">
                <Title className="fr-mb-0" as="h2" look="h4">Participants français</Title>
              </Row>
              <Row gutters>
                <Col xs="12" md={markers.length ? "6" : "12"}>
                  <Row>
                    {data.participants?.filter((e) => e.structure?.address?.[0]?.country === 'France')?.map((part) => (
                      <Col xs="12">
                        <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!part.structure?.id })}>
                          <div className="structure-avatar fr-mr-2w fr-icon-building-line" />
                          <div style={{ flexGrow: 1, display: "block" }}>
                            <Text className="fr-m-0">
                              {
                                part.structure?.id ? (
                                  <Link href={`/organizations/${part.structure?.id}`}>
                                    {part.structure?.label?.default}
                                  </Link>
                                ) : part.label?.default?.split('__')[0]
                              }
                            </Text>
                            {part.role && <Text className="fr-card__detail" size="sm">
                              <i>
                                {part.role}
                              </i>
                            </Text>}
                            {part.funding && <Text className="fr-card__detail" size="sm">
                              <i>
                                Financé à hauteur de {Number(part.funding.split(',')[0]).toLocaleString()} €
                              </i>
                            </Text>}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
                {markers.length ? (<Col xs="12" md="6">
                  <div style={{ height: "100%", maxHeight: "380px", width: "100%", float: "right" }}>
                    <Map markers={markers} height={data?.participants.length > 2 ? "100%" : "200px"} width="100%" />
                  </div>
                </Col>) : null}
              </Row>
            </Container>
            <Container fluid className="fr-mb-8w">
              <Row className="fr-my-3w">
                <Title className="fr-mb-0" as="h2" look="h4">Contributions scientifiques</Title>
              </Row>
              <Row>
                <Col className="fr-mt-5w" xs="12">
                  <Tabs>
                    <Tab index="1" className="authors-publications-tabs" label="Publications (0)">
                      <Notice type="info" closeMode="disallow">
                        Liste des publications
                      </Notice>
                    </Tab>
                    <Tab index="2" className="authors-patents-tabs" label="Brevets (0)">
                      Liste des brevets
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </Container>

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
                    <CopyBadgeButton lowercase size="sm" text={data.id} />
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