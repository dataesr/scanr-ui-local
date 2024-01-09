import { useState } from "react";
import cs from "classnames";
import { Badge, BadgeGroup, Button, Col, Container, Link, Row, Text, Title } from "@dataesr/dsfr-plus";
import { Organization } from "../../../../api/types/organization";
import CopyBadgeButton from "../../../../components/copy/copy-badge-button";
import { PageSidebar, PageSidebarItem } from "../../../../components/page-sidebar";
import Map from "../../../../components/map";
import TagCloud from "../../../../components/tag-cloud";
import Histogram from "../../../../components/YearRangeSlider/histogram";
import BarLink from "../../../../components/bar-link";
import OaDonut from "../../../../components/oa-donut";


export default function OrganizationPresentation({ data }: { data: Organization }) {

  const publicationsFilterUrl = `/search/publications?filters=${encodeURIComponent(JSON.stringify([{ field: 'affiliations.id', value: [data.id], type: 'terms' }]))}`;
  const projectsFilterUrl = `/search/projects?filters=${encodeURIComponent(JSON.stringify([{ field: 'participants.structure.id', value: [data.id], type: 'terms' }]))}`;

  const [publicationGraph, setPublicationGraph] = useState("wiki");
  const [projectGraph, setProjectGraph] = useState("type");
  const { publications, projects } = data


  const mainAdress = data?.address.find((element) => element.main)
  const markers = data?.address.map((address) => ({
    latLng: [address?.gps?.lat, address?.gps?.lon],
    address: `${address?.address},
          ${address?.postcode}, ${address?.city},
          ${address?.country}`,
  }))

  return (
    <>
      <Container fluid>
        <Row gutters>
          <Col xs="12" md="8">
            <Container fluid className="fr-mb-8w">
              <div style={{ display: "flex", flexWrap: "nowrap" }} className="fr-my-1v">
                <div style={{ flexGrow: 1 }}>
                  <BadgeGroup className="structure-badge-list fr-mt-1v">
                    {data?.kind?.map((k) => <Badge key={k} size="sm" variant="info" noIcon>{k}</Badge>)}
                    {data.level && <Badge size="sm" color='green-emeraude'>{data.level}</Badge>}
                    {data.nature && <Badge size="sm" color='green-emeraude'>{data.nature}</Badge>}
                  </BadgeGroup>
                  <Title className="fr-mb-0" as="h1" look="h4">
                    {data.label.default}
                  </Title>
                  {data?.creationYear && (<Text className="fr-card__detail" size="sm">
                    <i>Structure active depuis {data.creationYear}</i>
                  </Text>)}
                </div>
                <div>
                  <img
                    id="structure-logo"
                    style={{ maxHeight: "100px" }}
                    width="auto"
                    height="auto"
                    src={`https://storage.sbg.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/dataesr/${data.id}_128.png`}
                    alt={`Logo ${data.label.default}`}
                    className="fr-mr-1v"
                    onError={() => document?.getElementById("structure-logo")?.remove()}
                  />
                </div>
              </div>
              <Row>
                {data?.description?.default && <Text className="fr-m-0" size="sm">{data.description.default}</Text>}
              </Row>
            </Container>
            <Container fluid className="fr-mb-8w">
              <Title as="h2" className="fr-text--lead fr-icon-team-line">
                Équipe de direction
              </Title>
              <Row gutters>
                {data.leaders?.filter(l => l.role === "Directeur")?.map((leader) => (
                  <Col xs="12" md="6">
                    <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!leader.person })}>
                      <div className="author-avatar fr-mr-2w fr-icon-user-line" />
                      <div style={{ flexGrow: 1, display: "block" }}>
                        <Text className="fr-card__detail" size="sm">
                          <i>{leader.role}</i>
                        </Text>
                        <Text className="fr-m-0">
                          <Link href={`/authors/${leader.person}`}>
                            {leader.firstName}
                            {' '}
                            {leader.lastName}
                          </Link>
                        </Text>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <hr className="fr-p-0 fr-my-1w" style={{ width: "60%" }} />
              <Row gutters>
                {data.leaders?.filter(l => l.role !== "Directeur")?.map((leader) => (
                  <Col xs="12" md="6">
                    <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!leader.person })}>
                      <div className="author-avatar fr-mr-2w fr-icon-user-line" />
                      <div style={{ flexGrow: 1, display: "block" }}>
                        <Text className="fr-card__detail" size="sm">
                          <i>{leader.role}</i>
                        </Text>
                        <Text className="fr-m-0">
                          {
                            leader.person ? (
                              <Link href={`/authors/${leader.person}`}>
                                {leader.firstName}
                                {' '}
                                {leader.lastName}
                              </Link>
                            ) : (<>{leader.firstName}
                              {' '}
                              {leader.lastName}</>)
                          }
                        </Text>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
            <Container fluid className="fr-mb-8w">
              <Title as="h2" className="fr-text--lead fr-icon-git-branch-line">
                Appartenance et réseaux
              </Title>
              <Text bold>
                Établissements tutelles
              </Text>
              <Row gutters className="fr-mb-3w">
                {data.institutions?.filter((e) => e.relationType === "établissement tutelle")?.map((institution) => (
                  <Col xs="12" md="6">
                    <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!institution.structure })}>
                      <div className="structure-avatar fr-mr-2w fr-icon-government-line" />
                      <div style={{ flexGrow: 1, display: "block" }}>
                        <Text className="fr-m-0">
                          {
                            institution.structure ? (
                              <Link href={`/organizations/${institution.structure}`}>
                                {institution.label}
                              </Link>
                            ) : institution.label
                          }
                        </Text>
                        {institution.fromDate && <Text className="fr-card__detail" size="sm">
                          <i>
                            depuis le
                            {' '}
                            {new Date(institution.fromDate).toLocaleDateString()}
                          </i>
                        </Text>}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <Text bold>
                Établissements participants
              </Text>
              <Row gutters className="fr-mb-3w">
                {data.institutions?.filter((e) => e.relationType !== "établissement tutelle")?.map((institution) => (
                  <Col xs="12" md="6">
                    <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!institution.structure })}>
                      <div className="structure-avatar fr-mr-2w fr-icon-building-line" />
                      <div style={{ flexGrow: 1, display: "block" }}>
                        <Text className="fr-m-0">
                          {
                            institution.structure ? (
                              <Link href={`/organizations/${institution.structure}`}>
                                {institution.label}
                              </Link>
                            ) : institution.label
                          }
                          <Link href={`/organizations/${institution.structure}`}>
                            {institution.label}
                          </Link>
                        </Text>
                        {institution.fromDate && <Text className="fr-card__detail" size="sm">
                          <i>
                            depuis le
                            {' '}
                            {new Date(institution.fromDate).toLocaleDateString()}
                          </i>
                        </Text>}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <Text bold>
                Écoles doctorales
              </Text>
              <Row gutters className="fr-mb-3w">
                {data.relations?.filter((e) => e.type === "DS_LABS")?.map((ed, i) => (
                  <Col key={i} xs="12" md="6">
                    <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!ed.structure })}>
                      <div className="structure-avatar fr-mr-2w fr-icon-community-fill" />
                      <div style={{ flexGrow: 1, display: "block" }}>
                        <Text className="fr-m-0">
                          {
                            ed.structure ? (
                              <Link href={`/organizations/${ed.structure}`}>
                                {ed.denormalized?.label?.default}
                              </Link>
                            ) : ed.denormalized?.label?.default
                          }
                        </Text>
                        {ed.fromDate && <Text className="fr-card__detail" size="sm">
                          <i>
                            depuis le
                            {' '}
                            {new Date(ed.fromDate).toLocaleDateString()}
                          </i>
                        </Text>}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
            <Container fluid className="fr-mb-8w">
              <Title as="h2" className="fr-text--lead fr-icon-heart-pulse-line">
                Activités recherche et innovation
              </Title>
              <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                  <Text className="fr-m-0" bold>
                    {publications.publicationsCount} publications répertoriées par scanR
                  </Text>
                </div>
                <Button as="a" size="sm" variant="text" icon="arrow-right-s-line" iconPosition="right" href={publicationsFilterUrl}>
                  Voir la liste des publications
                </Button>
              </div>
              <Row gutters>
                <Col xs="4">
                  <fieldset id="publication-graph-selector" className="fr-segmented">
                    <div style={{ flexDirection: "column" }} className="fr-segmented__elements">
                      <div className="fr-segmented__element">
                        <input checked={(publicationGraph === "wiki")} type="radio" id="segmented-2218-2" />
                        <label onClick={() => setPublicationGraph("wiki")} className="fr-label" htmlFor="segmented-2218-2">
                          Nuage de mot clés
                        </label>
                      </div>
                      <div className="fr-segmented__element">
                        <input checked={(publicationGraph === "year")} onClick={() => setPublicationGraph("year")} value="3" type="radio" id="segmented-2218-3" />
                        <label className="fr-label" htmlFor="segmented-2218-3">
                          Répartition par année
                        </label>
                      </div>
                      <div className="fr-segmented__element">
                        <input checked={(publicationGraph === "oa")} onClick={() => setPublicationGraph("oa")} value="4" type="radio" id="segmented-2218-4" />
                        <label className="fr-label" htmlFor="segmented-2218-4">
                          Taux d'accès ouvert
                        </label>
                      </div>
                      <div className="fr-segmented__element">
                        <input checked={(publicationGraph === "journals")} onClick={() => setPublicationGraph("journals")} value="5" type="radio" id="segmented-2218-5" />
                        <label className="fr-label" htmlFor="segmented-2218-5">
                          Top 10 des journaux
                        </label>
                      </div>
                      <div className="fr-segmented__element">
                        <input checked={(publicationGraph === "authors")} onClick={() => setPublicationGraph("authors")} value="6" type="radio" id="segmented-2218-6" />
                        <label className="fr-label" htmlFor="segmented-2218-6">
                          Top 10 des authors
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </Col>
                <Col xs="8">
                  {(publicationGraph === "year") && <Histogram data={publications.byYear.map((year) => year.count)} />}
                  {(publicationGraph === "oa") && <OaDonut height="400" percent={publications.byIsOa.find(v => v.label === "true")?.count} />}
                  {(publicationGraph === "wiki") && <TagCloud data={publications.byWiki} order="random" />}
                  {(publicationGraph === "authors") && publications.byAuthors?.map((a) => (
                    <BarLink
                      key={a.value}
                      name={a.label}
                      count={a.count}
                      width={a.normalizedCount}
                      href={`/authors/${a.value}`}
                    />
                  ))}
                  {(publicationGraph === "journals") && publications.bySource?.map((a) => (
                    <BarLink
                      key={a.value}
                      name={a.label}
                      count={a.count}
                      width={a.normalizedCount}
                    />
                  ))}
                </Col>
              </Row>
              <hr className="fr-my-3w" />
              <div className="fr-my-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                  <Text className="fr-m-0" bold>
                    {projects.projectsCount} financements répertoriés par scanR
                  </Text>
                </div>
                <Button as="a" size="sm" variant="text" icon="arrow-right-s-line" iconPosition="right" href={projectsFilterUrl}>
                  Voir la liste des financements
                </Button>
              </div>
              <Row gutters>
                <Col xs="4">
                  <fieldset id="publication-graph-selector" className="fr-segmented">
                    <div style={{ flexDirection: "column" }} className="fr-segmented__elements">
                      <div className="fr-segmented__element">
                        <input checked={(projectGraph === "type")} onClick={() => setProjectGraph("type")} type="radio" id="segmented-22187-4" />
                        <label className="fr-label" htmlFor="segmented-22187-4">
                          Types de financements
                        </label>
                      </div>
                      <div className="fr-segmented__element">
                        <input checked={(projectGraph === "year")} onClick={() => setProjectGraph("year")} type="radio" id="segmented-22187-3" />
                        <label className="fr-label" htmlFor="segmented-22187-3">
                          Répartition par année
                        </label>
                      </div>
                      <div className="fr-segmented__element">
                        <input checked={(projectGraph === "keywords")} type="radio" id="segmented-22187-2" />
                        <label onClick={() => setProjectGraph("keywords")} className="fr-label" htmlFor="segmented-22187-2">
                          Nuage de mot clés
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </Col>
                <Col xs="8">
                  {(projectGraph === "year") && (
                    <>
                      <Text>Répartition des financements obtenus par année</Text>
                      <Histogram data={projects.byYear.map((year) => year.count)} />
                    </>
                  )}
                  {(projectGraph === "keywords") && <TagCloud data={projects.byKeywords} order="random" />}
                  {(projectGraph === "type") && projects.byType?.map((a) => (
                    <BarLink
                      key={a.value}
                      name={a.label}
                      count={a.count}
                      width={a.normalizedCount}
                      href={`/authors/${a.value}`}
                    />
                  ))}
                </Col>
              </Row>
              <Row className="fr-mt-15w" />
              <Row className="fr-mt-15w" />
              <Row className="fr-mt-15w" />
              <Row className="fr-mt-15w" />
              <div>
                <pre>
                  {JSON.stringify(data || "", null, 2)}
                </pre>
              </div>
            </Container>
          </Col>
          <PageSidebar>
            <PageSidebarItem title="Localisation" description="">
              <Col className="fr-mt-1w" xs="12">
                <div className="fr-card fr-card--no-border fr-card--sm">
                  <div style={{ padding: "0" }} className="fr-card__body">
                    <div className="fr-card__content fr-m-0 fr-p-1w">
                      <ul style={{ listStyle: "none" }}>
                        <li key="main" >
                          <Text bold size="sm" className="fr-card__detail fr-icon-map-pin-2-fill fr-pb-1w fr-pr-1w">
                            {mainAdress.address}
                            {mainAdress.address && <br />}
                            {[mainAdress?.postcode, mainAdress?.city, mainAdress?.country].filter((element) => element).join(', ')}
                          </Text>
                          <hr className="fr-pb-1w" style={{ marginLeft: "10%", width: "90%" }} />
                        </li>
                        {data?.address?.filter((a) => !a.main)?.map((address, i) => (
                          <li key={i}>
                            <Text size="sm" className="fr-card__detail fr-icon-map-pin-2-line fr-pb-1w fr-pr-1w">
                              {address.address}
                              {address.address && <br />}
                              {[address?.postcode, address?.city, address?.country].filter((element) => element).join(', ')}
                            </Text>
                            <hr className="fr-pb-1w" style={{ marginLeft: "10%", width: "90%" }} />
                          </li>
                        )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="fr-card__header">
                    <div className="fr-card__img">
                      <Map markers={markers} height="250px" />
                    </div>
                  </div>
                </div>
              </Col>
            </PageSidebarItem>
            <PageSidebarItem title="Réseaux sociaux" description="">
              <div className="fr-follow">
                <div className="fr-container">
                  <div className="fr-grid-row">
                    <div className="fr-col-12">
                      <div className="fr-follow__social">
                        <ul className="fr-btns-group">
                          {data.socialMedias?.map((socialMedia, i) => (
                            <li key={i} style={{ width: "100%" }}>
                              <a
                                className={`fr-btn--${socialMedia.type?.toLowerCase()} fr-btn social-btn`}
                                href={socialMedia.url}
                                target="_blank"
                                rel="noreferrer noopener external"
                              >
                                {socialMedia.type?.toLowerCase()}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PageSidebarItem>
            <PageSidebarItem title="Présence sur le web" description="">
              <div className="fr-follow">
                <div className="fr-container">
                  <div className="fr-grid-row">
                    <div className="fr-col-12">
                      <div className="fr-follow__social">
                        <ul className="fr-btns-group">
                          {data.links?.map((link, i) => (
                            <li key={i} style={{ width: "100%" }}>
                              <a
                                className="fr-btn--links fr-btn social-btn"
                                href={link.url}
                                target="_blank"
                                rel="noreferrer noopener external"
                              >
                                {link.type?.toLowerCase()}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PageSidebarItem>
            <PageSidebarItem title="Identifiants de la structure" description="Cliquez pour copier l'identifiant dans le press-papier">
              <div>
                <div className="fr-badge-group">
                  {data?.externalIds
                    ?.filter((ext) => ext?.type !== 'scanr')
                    .map((ext) => <CopyBadgeButton key={ext.id} lowercase size="sm" text={ext.id} />)
                  }
                </div>
              </div>
            </PageSidebarItem>
          </PageSidebar>
        </Row >

      </Container >
    </>
  )
}