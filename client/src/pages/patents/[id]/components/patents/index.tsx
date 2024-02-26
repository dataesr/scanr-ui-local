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

export default function PatentPage({ data }: { data: Patent }) {
  const intl = useIntl();
  const { screen } = useScreenSize();
  const patentActors = data.authors;
  const iso2Codes = data.patents.map((patent) => patent.office);

  const depInfo = data.authors.reduce(
    (acc, author) => {
      if (author.rolePatent.some((role) => role.role === "dep")) {
        acc.count++;
        acc.names.push(author.fullName);
      }
      return acc;
    },
    { count: 0, names: [] }
  );

  const numberOfDep = depInfo.count;
  const depNames = depInfo.names;

  const invInfo = data.authors.reduce(
    (acc, author) => {
      if (author.rolePatent.some((role) => role.role === "inv")) {
        acc.count++;
        acc.names.push(author.fullName);
      }
      return acc;
    },
    { count: 0, names: [] }
  );

  const numberOfInv = invInfo.count;
  const invNames = invInfo.names;

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
                title={intl.formatMessage({ id: "patents.section.first.dep" })}
                show
              >
                <Text>{data.submissionDate}</Text>
              </PageSection>
              <PageSection
                title={intl.formatMessage({ id: "patents.section.first.pub" })}
                show
              >
                <Text>{data.publicationDate}</Text>
              </PageSection>
              <PageSection
                title={intl.formatMessage({ id: "patents.section.issued" })}
                show
              >
                <Text>
                  {intl.formatMessage({
                    id: "patents.section.first.deliverance",
                  })}
                  {data.grantedDate}
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
              {/* <Text>
                <b>{numberOfDep} déposants:</b>
                <ul>
                  {depNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </Text> */}
            </PageSection>
            {/* <PageSection
              show
              title={intl.formatMessage({
                id: "patents.section.authors",
              })}
            >
              <Text>
                <b>{numberOfInv} inventeurs:</b>
                <ul>
                  {invNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </Text>
            </PageSection> */}
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
