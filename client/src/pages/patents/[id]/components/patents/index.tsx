import {
  Badge,
  BadgeGroup,
  Col,
  Container,
  Link,
  Row,
  Text,
  Title,
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
import { toString } from "../../../../../utils/string";
import PatentFamily from "../family";
import Share from "../../../../../components/share";
import { useParams } from "react-router-dom";

export default function PatentPage({ data }: { data: Patent }) {
  const intl = useIntl();
  const { id } = useParams();
  const { screen } = useScreenSize();
  const patentActors = data.authors;
  const iso2Codes = data.patents.map((patent) => patent.office);

  return (
    <Container fluid>
      <Row gutters={!["sm", "xs"].includes(screen)}>
        <Col xs="12" md="8">
          <BadgeGroup>
            <Badge variant="info" noIcon>
              Brevet
            </Badge>
          </BadgeGroup>
          <Title className="fr-mb-3w" as="h1" look="h3">
            {data.title.fr ? data.title.fr : data.title.en}{" "}
          </Title>
          <Container fluid className="fr-mb-6w"></Container>
          <Container fluid>
            <PageContent>
              <PageSection
                title={intl.formatMessage({ id: "patents.section.info" })}
                show
                icon="git-branch-line"
              >
                <Text className="fr-card__detail" size="sm">
                  <i>
                    {intl.formatMessage({ id: "patents.section.first.dep" })}
                    {toString(data.submissionDate)}
                    <br />
                    {intl.formatMessage({ id: "patents.section.first.pub" })}
                    {toString(data.publicationDate)}
                    <br />
                    {intl.formatMessage({ id: "patents.section.issued" })}{" "}
                    {toString(data.grantedDate)}
                  </i>
                </Text>
              </PageSection>
              <PageSection
                show
                title={intl.formatMessage({ id: "patents.section.summary" })}
              >
                <Text>
                  {data.summary.fr ? data.summary.fr : data.summary.en}
                </Text>
              </PageSection>
              <PageSection
                show
                title={intl.formatMessage({
                  id: `patents.section.family`,
                })}
                description={
                  data.patents.length > 1
                    ? `Les différents brevets de la famille ${id}`
                    : null
                }
              >
                <PatentFamily data={data} />
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
                id: "patents.section.dep",
              })}
            >
              <PatentActors data={patentActors} />
            </PageSection>
            <PageSection
              show
              title={intl.formatMessage({
                id: "patents.section.classification",
              })}
            >
              <Text>
                <ul>
                  {data.domains.map((el, index) => {
                    if (el.level === "ss_classe") {
                      return (
                        <li key={index}>
                          <Link href={`/${el.code}`}>{el.label.default}</Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </Text>
            </PageSection>
            <PageSection show title="Partager la page">
              <Share />
            </PageSection>
          </PageContent>
          <hr className="fr-my-3w" />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Map height="500px" markers={[]} iso2Codes={iso2Codes} zoom={2} />
        </Col>
      </Row>
    </Container>
  );
}
