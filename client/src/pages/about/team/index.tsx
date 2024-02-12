import {
  Breadcrumb,
  Col,
  Container,
  Link,
  Row,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { FormattedMessage, IntlProvider } from "react-intl";

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
  aScanR: (chunks: any) => (
    <a href="medias" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aOgp: (chunks: any) => (
    <a
      href="https://www.opengovpartnership.org/fr/documents/france-action-plan-2018-2020/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aEsR: (chunks: any) => (
    <a
      href="https://www.enseignementsup-recherche.gouv.fr/cid132529/le-plan-national-pour-la-science-ouverte-les-resultats-de-la-recherche-scientifique-ouverts-a-tous-sans-entrave-sans-delai-sans-paiement.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aR: (chunks: any) => (
    <a
      href="https://researchalps.eu/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aBSO: (chunks: any) => (
    <a
      href="https://bso.esr.gouv.fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aEIG: (chunks: any) => (
    <a
      href="https://entrepreneur-interet-general.etalab.gouv.fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aWDD: (chunks: any) => (
    <a
      href="https://www.wedodata.fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aUm: (chunks: any) => (
    <a href="https://www.unimore.it" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aBes: (chunks: any) => (
    <a href="http://www.abes.fr/" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aTeg: (chunks: any) => (
    <a
      href="https://www.team.etalab.gouv.fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aM: (chunks: any) => (
    <a
      href="https://www.miur.gov.it/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aUmtg: (chunks: any) => (
    <a
      href="https://www.unimontagnait/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aUnimi: (chunks: any) => (
    <a href="https://www.unimi.it" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aSt: (chunks: any) => (
    <a
      href="https://wwwsidetrade.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aSW: (chunks: any) => (
    <a
      href="https://www.sword-group.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  em: (chunks: any) => <a href="/focus">{chunks}</a>,
};

export default function Team() {
  const { locale } = useDSFRConfig();
  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="fr"
    >
      <Container className="bg-grey" fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">Accueil</Link>
            <Link>
              <FormattedMessage id="app.team.breadcrumb" values={formating} />
            </Link>
          </Breadcrumb>
          <Row className="fr-mb-4w">
            <Title as="h1" look="h3">
              <FormattedMessage id="app.team.h1" values={formating} />
            </Title>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row gutters>
          <Col xs="12" md="10" lg="9" xl="10" className="fr-mb-2w">
            <FormattedMessage id="app.team.project" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="10" className="fr-mb-2w">
            <FormattedMessage id="app.team.scanr" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="10" className="fr-mb-2w">
            <FormattedMessage id="app.team.topo" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="10" className="fr-mb-2w">
            <FormattedMessage id="app.team.version" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="10" className="fr-mb-2w">
            <FormattedMessage id="app.team.team" values={formating} />
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  );
}
