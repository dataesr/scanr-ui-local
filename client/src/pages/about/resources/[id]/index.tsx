import {
  useDSFRConfig,
  Breadcrumb,
  Link,
  Container,
  Row,
  Title,
  Col,
} from "@dataesr/dsfr-plus";
import { IntlProvider, createIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { websiteURL } from "../utils/weblinks";

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

export default function ResourcesInformations() {
  const { locale } = useDSFRConfig();
  const { id } = useParams();

  const intl = createIntl({ locale, messages: messages[locale] });
  if (!messages) return null;

  const { website, wikipedia } = websiteURL(id);

  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <Container className="bg-grey" fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">Accueil</Link>
            <span> / </span>
            <Link href="/about/resources">Ressources</Link>
            <span> / </span>
            <Link>
              {intl.formatMessage({
                id: `app.resourcesID.${id}.breadcrumb.current`,
              })}
            </Link>
          </Breadcrumb>
          <Row className="fr-mb-4w">
            <Col>
              <Title as="h3" className="fr-mb-1w">
                {intl.formatMessage({ id: `app.resourcesID.${id}.title` })}
              </Title>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row gutters>
          <Col xs="12" md="8">
            <Title as="h4" style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: "app.resourcesID.role" })}
            </Title>
            <p style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: `app.resourcesID.${id}.role` })}
            </p>
            <Title as="h4" style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: `app.resourcesID.description` })}
            </Title>
            <p style={{ marginBottom: "2rem" }}>
              {intl.formatMessage({ id: `app.resourcesID.${id}.description` })}
            </p>
            <Title as="h4" style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: "app.resourcesID.productor" })}
            </Title>
            <p style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: `app.resourcesID.${id}.productor` })}
            </p>
            <p style={{ marginBottom: "2rem" }}>
              <Link href={website} target="_blank">
                {intl.formatMessage({ id: "app.resourcesID.website" })}
              </Link>
              <span style={{ marginLeft: "1rem" }}>
                <Link href={wikipedia} target="_blank">
                  {intl.formatMessage({ id: "app.resourcesID.wikipedia" })}
                </Link>
              </span>
            </p>
            <Title as="h4" style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: "app.resourcesID.frequency" })}
            </Title>
            <p style={{ marginBottom: "2rem" }}>
              {intl.formatMessage({
                id: `app.resourcesID.${id}.frequency`,
              })}
            </p>
          </Col>
          <Col xs="12" md="4">
            <Title as="h4" style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: "app.resourcesID.usage" })}
            </Title>
            <p style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: `app.resourcesID.${id}.usage1` })}
            </p>
            <p style={{ marginBottom: "2rem" }}>
              {intl.formatMessage({ id: `app.resourcesID.${id}.usage2` })}
            </p>
            <Title as="h4" style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: "app.resourcesID.perimeter" })}
            </Title>
            <p style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: `app.resourcesID.${id}.perimeter` })}
            </p>
            <Title as="h4" style={{ marginBottom: "1rem" }}>
              {intl.formatMessage({ id: "app.resourcesID.retreatment" })}
            </Title>
            <p style={{ marginBottom: "2rem" }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({
                    id: `app.resourcesID.${id}.retreatment`,
                  }),
                }}
              />
            </p>
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  );
}
