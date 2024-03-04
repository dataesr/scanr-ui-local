import { Breadcrumb, Col, Container, Link, Row, Title, useDSFRConfig } from "@dataesr/dsfr-plus";
import ContactForm from "../../../components/contact-form";
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

export default function ContactPage() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  if (!messages) return null;

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">{intl.formatMessage({ id: "contact.breadcrumb.home" })}</Link>
          <Link>
            {intl.formatMessage({ id: "contact.breadcrumb.contact" })}
          </Link>
        </Breadcrumb>
        <Title as="h1" look="h3">
          {intl.formatMessage({ id: "contact.title" })}
        </Title>
        <Row>
          <Col xs={12} lg={7}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </RawIntlProvider >
  );
}