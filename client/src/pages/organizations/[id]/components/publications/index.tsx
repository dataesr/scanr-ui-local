import { useIntl } from "react-intl";
import { useId, useState } from "react";
import { Button, Row, Col, Text } from "@dataesr/dsfr-plus";
import TagCloud from "../../../../../components/tag-cloud";
import BarLink from "../../../../../components/bar-link";
import { OrganizationPublicationsData } from "../../../../../types/organization";
import useScreenSize from "../../../../../hooks/useScreenSize";
import YearBars from "../../../../../components/year-bars";

type OrganizationPublicationsProps = {
  data: OrganizationPublicationsData,
  value: string,
  label?: string
}

export default function OrganizationPublications({
  data: publications,
  value,
  label = "",
}: OrganizationPublicationsProps) {
  const { screen } = useScreenSize();
  const intl = useIntl();
  const searchFilter = { 'affiliations.id': { values: [{ value: value, label }], type: 'terms' } };
  const publicationsFilterUrl = `/search/publications?filters=${encodeURIComponent(JSON.stringify(searchFilter))}`;
  const [publicationGraph, setPublicationGraph] = useState("openalex");
  const segmentId = useId();

  if (!publications.publicationsCount || publications.publicationsCount === 0) {
    return null;
  }

  if (publications.publicationsCount < 10 || ["xs", "sm"].includes(screen)) {
    return (
      <>
        <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Text className="fr-m-0" bold>
              {publications.publicationsCount === 10000 ? "10 000+" : publications.publicationsCount}
              {" "}
              {intl.formatMessage({ id: "organizations.publications.count" })}
            </Text>
          </div>
          <Button
            as="a"
            variant="text"
            icon="arrow-right-s-line"
            iconPosition="right"
            href={publicationsFilterUrl}
          >
            {intl.formatMessage({ id: "organizations.publications.search" })}
          </Button>
        </div>
        <hr />
      </>
    );
  }

  return (
    <>
      <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Text size="lg" className="fr-m-0" bold>
            {publications.publicationsCount === 10000 ? "10 000+" : publications.publicationsCount}
            {" "}
            {intl.formatMessage({ id: "organizations.publications.count" })}
          </Text>
        </div>
        <Button
          as="a"
          variant="text"
          icon="arrow-right-s-line"
          iconPosition="right"
          href={publicationsFilterUrl}
        >
          {intl.formatMessage({ id: "organizations.publications.search" })}
        </Button>
      </div>
      <Row gutters>
        <Col xs="12">
          <fieldset style={{ overflowX: "scroll"}} id="publication-graph-selector" className="fr-segmented fr-segmented--sm">
            <legend className="fr-segmented__legend">
              {intl.formatMessage({ id: "organizations.activity.fieldset.legend" })}
            </legend>
            <div className="fr-segmented__elements">
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "openalex")}
                  onClick={() => setPublicationGraph("openalex")}
                  type="radio"
                  id={`${segmentId}-openalex`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-openalex`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.openalex" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "support")}
                  onClick={() => setPublicationGraph("support")}
                  type="radio"
                  id={`${segmentId}-support`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-support`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.supports" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "grants")}
                  onClick={() => setPublicationGraph("grants")}
                  type="radio"
                  id={`${segmentId}-grants`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-grants`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.grants" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "infra")}
                  onClick={() => setPublicationGraph("infra")}
                  type="radio"
                  id={`${segmentId}-infra`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-infra`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.infras" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "wiki")}
                  onClick={() => setPublicationGraph("wiki")}
                  type="radio"
                  id={`${segmentId}-wiki`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-wiki`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.wikis" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "year")}
                  onClick={() => setPublicationGraph("year")}
                  type="radio"
                  id={`${segmentId}-year`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-year`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.year" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "journals")}
                  onClick={() => setPublicationGraph("journals")}
                  type="radio"
                  id={`${segmentId}-journals`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-journals`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.journals" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={(publicationGraph === "authors")}
                  onClick={() => setPublicationGraph("authors")}
                  type="radio"
                  id={`${segmentId}-authors`}
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-authors`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.authors" })}
                </label>
              </div>
            </div>
          </fieldset>
        </Col>
        <Col xs="12" className="fr-pb-6w">
          {(publicationGraph === "year") && (<YearBars
            name={intl.formatMessage({ id: "organizations.publications.year-bars.name" })}
            height="300px"
            counts={publications.byYear.map((year) => year.count)}
            years={publications.byYear.map((year) => year.label)}
          />)}
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
          {(publicationGraph === "openalex") && publications.byOpenAlexFields?.map((a) => (
            <BarLink
              key={a.value}
              name={a.label}
              count={a.count}
              width={a.normalizedCount}
            />
          ))}
          {(publicationGraph === "support") && publications.bySupportEntity?.map((a) => (
            <BarLink
              key={a.value}
              name={a.label}
              count={a.count}
              width={a.normalizedCount}
            />
          ))}
          {(publicationGraph === "grants") && publications.byGrantsFunder?.map((a) => (
            <BarLink
              key={a.value}
              name={a.label}
              count={a.count}
              width={a.normalizedCount}
            />
          ))}
          {(publicationGraph === "infra") && publications.byInfrastructureName?.map((a) => (
            <BarLink
              key={a.value}
              name={a.label}
              count={a.count}
              width={a.normalizedCount}
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
      <hr />
    </>
  );
}
