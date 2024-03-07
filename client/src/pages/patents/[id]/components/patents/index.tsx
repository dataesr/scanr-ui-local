import {
  Badge,
  BadgeGroup,
  Col,
  Container,
  Row,
  Text,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import { Patent } from "../../../../../types/patent";
import useScreenSize from "../../../../../hooks/useScreenSize";
import {
  PageContent,
  PageSection,
} from "../../../../../components/page-content";
import Map from "../../../../../components/map";
import PatentActors from "../actors";
import Share from "../../../../../components/share";
import getLangFieldValue from "../../../../../utils/lang";
import PatentCPC from "../cpc";
import PatentFilings from "../patents-filings";
import Identifiers from "../identifier";
import MapLegend from "../utils/map-legend";

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  year: "numeric",
  month: "long",
};

export default function PatentPage({ data }: { data: Patent }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  const { screen } = useScreenSize();
  const patentActors = data.authors;
  const iso2Codes = data.patents.map((patent) => patent.office);

  return (
    <Container fluid>
      <Row gutters={!["sm", "xs"].includes(screen)}>
        <Col xs="12" md="8">
          <BadgeGroup>
            <Badge color="purple-glycine" style={{ marginRight: "10px" }}>
              {intl.formatMessage({
                id: "patents.section.badge",
              })}
            </Badge>
          </BadgeGroup>
          <Title className="fr-mb-3w" as="h1" look="h3">
            {getLangFieldValue(locale)(data.title)}
          </Title>
          <Container fluid>
            <PageContent>
              <PageSection
                title={intl.formatMessage({ id: "patents.section.info" })}
                show
                icon="git-branch-line"
              >
                <Text className="fr-card__detail" size="sm">
                  <i>
                    {intl.formatMessage({ id: "patents.section.first.dep" })}{" "}
                    {new Date(data.submissionDate).toLocaleDateString(
                      locale,
                      options
                    )}{" "}
                    | {intl.formatMessage({ id: "patents.section.first.pub" })}{" "}
                    {new Date(data.publicationDate).toLocaleDateString(
                      locale,
                      options
                    )}
                    <br />
                    {data.grantedDate && (
                      <>
                        {intl.formatMessage({ id: "patents.section.issued" })}
                        {new Date(data.grantedDate).toLocaleDateString(
                          locale,
                          options
                        )}
                      </>
                    )}
                  </i>
                </Text>
              </PageSection>
              <PageSection
                show
                size="hero"
                title={intl.formatMessage({ id: "patents.section.summary" })}
              >
                <Text>
                  {data.summary.fr ? data.summary.fr : data.summary.en}
                </Text>
              </PageSection>
              <PageSection
                show
                size="hero"
                title={intl.formatMessage({
                  id: "patents.section.dep",
                })}
              >
                <PatentActors data={patentActors} type="dep" />
              </PageSection>
              <PageSection
                show
                size="hero"
                title={intl.formatMessage({
                  id: "patents.section.inv",
                })}
              >
                <PatentActors data={patentActors} type="inv" />
              </PageSection>
              <PageSection
                show
                size="hero"
                title={intl.formatMessage({
                  id: "patents.section.family",
                })}
              >
                <PatentFilings data={data} />
              </PageSection>
              <PageSection
                show
                size="hero"
                title={intl.formatMessage({
                  id: "patents.section.map",
                })}
              >
                <MapLegend />
                <Map
                  height="500px"
                  markers={[]}
                  iso2Codes={iso2Codes}
                  zoom={2}
                />
              </PageSection>
              <PageSection title="data section" show>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </PageSection>
            </PageContent>
          </Container>
        </Col>
        <Col xs="12" md="4" xl="3" offsetXl="1">
          <PageContent>
            <PageSection
              show
              title={intl.formatMessage({
                id: `patents.id.title`,
              })}
              description={intl.formatMessage({
                id: `patents.copy`,
              })}
            >
              <Identifiers />
            </PageSection>
            <PageSection
              show
              title={intl.formatMessage({
                id: `patents.section.cpc`,
              })}
              description={intl.formatMessage({
                id: `patents.section.description.cpc`,
              })}
            >
              <PatentCPC data={data} />
            </PageSection>
            <PageSection show title="Partager la page">
              <Share />
            </PageSection>
          </PageContent>
          <hr className="fr-my-3w" />
        </Col>
      </Row>
    </Container>
  );
}
