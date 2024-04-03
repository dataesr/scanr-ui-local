import { Breadcrumb, Col, Container, Link, Row, Text, Title, useDSFRConfig } from "@dataesr/dsfr-plus";
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

const P = (children) => <Text className="fr-mb-0 fr-mt-2w" {...children} />;

const brFormating = {
  br: () => <br />,
};
const etalabFormating = {
  etalab: (chunks) => <Link href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf" target="_blank" rel="noopenner noreferrer">{chunks}</Link>,
};

export default function LegalNotice() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
          <Link href="/">
            {intl.formatMessage({ id: "app.legals.breadcrumb.home" })}
          </Link>
          <Link>
            {intl.formatMessage({ id: "app.legals.breadcrumb.current" })}
          </Link>
        </Breadcrumb>
        <Row className="fr-mt-6w">
          <Title as="h1">
            {intl.formatMessage({ id: "app.legals.title" })}
          </Title>
        </Row>
      </Container>
      <Container className="fr-mb-15w">
        <Row>
          <Col xs="12" md="8">
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.editor" })}
              </Title>
              <Text>
                <Text as="span" bold>
                  {intl.formatMessage({ id: "app.legals.editor.1" })}
                </Text>
                {intl.formatMessage({ id: "app.legals.editor.2" }, brFormating)}
                <div className="fr-mt-2w" />
                <Text as="span">
                  {intl.formatMessage({ id: "app.legals.editor.3" }, brFormating)}
                </Text>
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.hosting" })}
              </Title>
              <Text>
                {intl.formatMessage({ id: "app.legals.hosting.1" }, brFormating)}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.conceptor" })}
              </Title>
              <Text>
                {intl.formatMessage({ id: "app.legals.conceptor.1" })}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.stats" })}
              </Title>
              <Text>
                {intl.formatMessage({ id: "app.legals.stats.1" })}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.reuse" })}
              </Title>
              <div className="fr-mb-3w">
                <P>
                  {intl.formatMessage({ id: "app.legals.reuse.1" }, etalabFormating)}
                </P>
                <P>
                  {intl.formatMessage({ id: "app.legals.reuse.2" })}
                </P>
                <P>
                  {intl.formatMessage({ id: "app.legals.reuse.3" })}
                </P>
              </div>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.hypertext" })}
              </Title>
              <Text>
                {intl.formatMessage({ id: "app.legals.hypertext.1" })}
              </Text>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.responsability" })}
              </Title>
              <P>
                {intl.formatMessage({ id: "app.legals.responsability.1" })}
              </P>
              <P>
                {intl.formatMessage({ id: "app.legals.responsability.2" })}
              </P>
              <P>
                {intl.formatMessage({ id: "app.legals.responsability.3" })}
              </P>
            </section>
            <section className="fr-py-3w">
              <Title as="h2" look="h5">
                {intl.formatMessage({ id: "app.legals.accessibility" })}
              </Title>
              <Text>
                {intl.formatMessage({ id: "app.legals.accessibility.1" })}
              </Text>
            </section>
          </Col>
        </Row>
      </Container>
    </RawIntlProvider >
  );
}