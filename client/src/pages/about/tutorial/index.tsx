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
import useConsent from "../../../hooks/useConsent";

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

function YoutubePlaceholder() {
  const { dialogId } = useConsent();

  return (
    <div className="fr-consent-placeholder">
      <h4 className="fr-h6 fr-mb-2v">**Nom du service** est désactivé</h4>
      <p className="fr-mb-6v">Autorisez le dépôt de cookies pour accéder à cette fonctionnalité.</p>
      <button aria-controls={dialogId} className="fr-btn" title="Autorisez le dépôt de cookies pour accéder au service **Nom du service**">
        Autoriser
      </button>
    </div>
  )
}

export default function Tutorial() {
  const { consent } = useConsent();
  const { locale } = useDSFRConfig();
  const youtube = consent?.youtube;
  const intl = createIntl({ locale, messages: messages[locale] });
  if (!messages) return null;

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="fr">
      <Container className="bg-grey" fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">Accueil</Link>
            <Link>
              {intl.formatMessage({ id: "app.tutorial.breadcrumb.current" })}
            </Link>
          </Breadcrumb>
          <Row className="fr-mb-4w">
            <Title as="h1" look="h3">
              {intl.formatMessage({ id: "app.tutorial.title" })}
            </Title>
          </Row>
          <Row>
            <Title as="h2" look="h5">
              {intl.formatMessage({ id: "app.tutorial.subtitle" })}
            </Title>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row horizontalAlign="center" className="fr-mt-8w">
          <Title as="h3" look="h6">
            {intl.formatMessage({ id: "app.tutorial.video.title1" })}
          </Title>
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            {youtube ? <iframe
              width="60%"
              height="400"
              src="https://www.youtube.com/embed/KBVXDcnfcso?si=6FijUwbtBxUQ7ubv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // @ts-expect-error: Ignoring type checking for the `frameborder` attribute
              frameborder="0"
            /> : <YoutubePlaceholder />}
          </Col>
        </Row>
        <Row horizontalAlign="center" className="fr-mt-5w">
          <Title as="h3" look="h6">
            {intl.formatMessage({ id: "app.tutorial.video.title2" })}
          </Title>
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <iframe
              width="60%"
              height="400"
              src="https://www.youtube.com/embed/KBVXDcnfcso?si=6FijUwbtBxUQ7ubv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // @ts-expect-error: Ignoring type checking for the `frameborder` attribute
              frameborder="0"
            />
          </Col>
        </Row>
        <Row horizontalAlign="center" className="fr-mt-5w">
          <Title as="h3" look="h6">
            {intl.formatMessage({ id: "app.tutorial.video.title3" })}
          </Title>
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <iframe
              width="60%"
              height="400"
              src="https://www.youtube.com/embed/KBVXDcnfcso?si=6FijUwbtBxUQ7ubv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // @ts-expect-error: Ignoring type checking for the `frameborder` attribute
              frameborder="0"
            />
          </Col>
        </Row>
        <Row horizontalAlign="center" className="fr-mt-5w">
          <Title as="h3" look="h6">
            {intl.formatMessage({ id: "app.tutorial.video.title4" })}
          </Title>
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <iframe
              width="60%"
              height="400"
              src="https://www.youtube.com/embed/KBVXDcnfcso?si=6FijUwbtBxUQ7ubv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // @ts-expect-error: Ignoring type checking for the `frameborder` attribute
              frameborder="0"
            />
          </Col>
        </Row>{" "}
        <Row horizontalAlign="center" className="fr-mt-5w">
          <Title as="h3" look="h6">
            {intl.formatMessage({ id: "app.tutorial.video.title5" })}
          </Title>
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <iframe
              width="60%"
              height="400"
              src="https://www.youtube.com/embed/KBVXDcnfcso?si=6FijUwbtBxUQ7ubv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // @ts-expect-error: Ignoring type checking for the `frameborder` attribute
              frameborder="0"
            />
          </Col>
        </Row>
        <Row horizontalAlign="center" className="fr-mt-5w">
          <Title as="h3" look="h6">
            {intl.formatMessage({ id: "app.tutorial.video.title6" })}
          </Title>
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <iframe
              width="60%"
              height="400"
              src="https://www.youtube.com/embed/KBVXDcnfcso?si=6FijUwbtBxUQ7ubv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // @ts-expect-error: Ignoring type checking for the `frameborder` attribute
              frameborder="0"
            />
          </Col>
        </Row>
        <Row horizontalAlign="center" className="fr-mt-5w">
          <Title as="h3" look="h6">
            {intl.formatMessage({ id: "app.tutorial.video.title7" })}
          </Title>
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <iframe
              width="60%"
              height="400"
              src="https://www.youtube.com/embed/KBVXDcnfcso?si=6FijUwbtBxUQ7ubv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // @ts-expect-error: Ignoring type checking for the `frameborder` attribute
              frameborder="0"
            />
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  );
}
