import {
  useDSFRConfig,
  Breadcrumb,
  Link,
  Container,
  Row,
  Title,
  Text,
  Col,
} from "@dataesr/dsfr-plus";
import { IntlProvider, createIntl } from "react-intl";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

const formating = {
  h2: (chunks: any) => (
    <Title as="h2" look="h4">
      {chunks}
    </Title>
  ),
  p: (chunks: any) => <p>{chunks}</p>,
  ul: (chunks: any) => <ul>{chunks}</ul>,
  li: (chunks: any) => <li>{chunks}</li>,
  b: (chunks: any) => <b>{chunks}</b>,
  br: () => <br />,
  aT: (chunks: any) => (
    <a href="https://www.theses.fr/" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
};

export default function Glossary() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  if (!messages) return null;

  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <Container className="bg-grey" fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">Accueil</Link>
            <Link>
              {intl.formatMessage({ id: "app.glossary.breadcrumb.current" })}
            </Link>
          </Breadcrumb>
          <Row className="fr-mb-4w">
            <Title as="h1">
              {intl.formatMessage({ id: "app.glossary.title" })}
            </Title>
          </Row>
        </Container>
      </Container>
      <Container fluid>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({ id: "app.glossary.h2020.subtitle" })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.h2020.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({ id: "app.glossary.scanr.subtitle" })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.scanr.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.scanr.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.scanr.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({ id: "app.glossary.search.subtitle" })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.search.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.search.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.search.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.search.question3",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({ id: "app.glossary.focus.subtitle" })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.focus.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({ id: "app.glossary.carto.subtitle" })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.carto.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.distribution.type.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.distribution.type.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.distribution.type.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.distribution.type.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.distribution.uu.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.distribution.uu.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.distribution.uu.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.distribution.uu.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.financial.type.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.financial.type.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.financial.type.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.financial.type.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.participants.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.participants.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.participants.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.participants.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.participants.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.participants.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.participants.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.participants.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.distribution.result.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.distribution.result.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.distribution.result.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.distribution.result.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.affiliations.mapping.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.affiliations.mapping.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.affiliations.mapping.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.affiliations.mapping.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.result.percentage.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.result.percentage.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.result.percentage.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.result.percentage.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.result.percentage.question3",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.keywords.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.keywords.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.keywords.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.keywords.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.mainjournals.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.mainjournals.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.mainjournals.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.mainjournals.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.publication.evolution.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.publication.evolution.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.publication.evolution.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.publication.evolution.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.invention.evolution.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.invention.evolution.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.invention.evolution.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.invention.evolution.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.invention.evolution.question3",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.publication.type.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.publication.type.description",
                },
                formating
              )}
            </Text>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.publication.type.question1",
                  },
                  formating
                )}
              </Link>
            </Col>
            <Col>
              <Link>
                {intl.formatMessage(
                  {
                    id: "app.glossary.publication.type.question2",
                  },
                  formating
                )}
              </Link>
            </Col>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.satt.carto.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.satt.carto.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.satt.shareholders.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.satt.shareholders.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.mainkeywords.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.mainkeywords.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.mainareas.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.mainareas.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.theses.number.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.theses.number.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.laureats.carto.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.laureats.carto.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.laureats.research.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.laureats.research.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
        <Row className="fr-mt-4w">
          <Col xs="12" md="8" offsetSm="1">
            <Title as="h2" look="h6">
              {intl.formatMessage({
                id: "app.glossary.laureats.distribution.subtitle",
              })}
            </Title>
            <Text>
              {intl.formatMessage(
                {
                  id: "app.glossary.laureats.distribution.description",
                },
                formating
              )}
            </Text>
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  );
}
