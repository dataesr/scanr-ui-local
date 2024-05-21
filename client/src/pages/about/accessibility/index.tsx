import {
  Breadcrumb,
  Col,
  Container,
  Link,
  Row,
  Text,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { RawIntlProvider, createIntl } from "react-intl";

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
  br: () => <br />,
  ul: (chunks: any) => <ul>{chunks}</ul>,
  li: (chunks: any) => <li>{chunks}</li>,
  aC: (chunks) => (
    <a href="contact" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aDef: (chunks) => (
    <a
      href="https://www.defenseurdesdroits.fr/carte-des-delegues"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aSp: (chunks) => (
    <a
      href="https://lannuaire.service-public.fr/autorites-independantes/1867f065-c823-4362-8d0f-8ca6b011a10f"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
};

export default function Accessibility() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
          <Link href="/">
            {intl.formatMessage({ id: "app.accessibility.breadcrumb.home" })}
          </Link>
          <Link>
            {intl.formatMessage({ id: "app.accessibility.breadcrumb.current" })}
          </Link>
        </Breadcrumb>
        <Row className="fr-mt-6w">
          <Title as="h1">
            {intl.formatMessage({ id: "app.accessibility.title" })}
          </Title>
        </Row>
      </Container>
      <Container className="fr-mb-15w">
        <Row>
          <Col xs="12" md="8">
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.accessibility.declaration" })}
              </Title>
              <Text>
                <Text as="span">
                  {intl.formatMessage({
                    id: "app.accessibility.declaration.text",
                  })}
                </Text>
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({
                  id: "app.accessibility.compliance.title",
                })}
              </Title>
              <Text as="span">
                {intl.formatMessage({
                  id: "app.accessibility.compliance.status",
                })}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage(
                  { id: "app.accessibility.tech.title" },
                  formating
                )}
              </Title>
              <Text>
                {intl.formatMessage(
                  { id: "app.accessibility.tech" },
                  formating
                )}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage(
                  { id: "app.accessibility.utils.title" },
                  formating
                )}
              </Title>
              <Text>
                {intl.formatMessage(
                  { id: "app.accessibility.utils" },
                  formating
                )}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage(
                  { id: "app.accessibility.contactUs" },
                  formating
                )}
              </Title>
              <Text>
                {intl.formatMessage(
                  { id: "app.accessibility.contactUs.text" },
                  formating
                )}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage(
                  { id: "app.accessibility.recourse.title" },
                  formating
                )}
              </Title>
              <Text>
                {intl.formatMessage(
                  { id: "app.accessibility.recourse.text" },
                  formating
                )}
              </Text>
            </section>
          </Col>
        </Row>
      </Container>
    </RawIntlProvider>
  );
}
