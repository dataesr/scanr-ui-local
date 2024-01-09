import { Breadcrumb, Col, Container, Link, Row, Title, useDSFRConfig } from '@dataesr/dsfr-plus';
import { FormattedMessage, IntlProvider } from 'react-intl';
import fr from './locales/fr.json';

const formating = {
  h2: (chunks: any) => <Title as="h2" look="h4">{chunks}</Title>,
  p: (chunks: any) => <p>{chunks}</p>,
  ul: (chunks: any) => <ul>{chunks}</ul>,
  li: (chunks: any) => <li>{chunks}</li>,
  b: (chunks: any) => <b>{chunks}</b>,
  a: (chunks: any) => <a href="https://scanr.enseignementsup-recherche.gouv.fr/" target="_blank" rel="noopener noreferrer">{chunks}</a>,
  focus: (chunks: any) => <a href='/focus'>{chunks}</a>,
}

const messages = {
  fr: fr,
}

export default function Team() {
  const { locale } = useDSFRConfig();
  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="fr">
      <Container>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link>
            <FormattedMessage id="app.team.breadcrumb" />
          </Link>
        </Breadcrumb>
        <Row>
          <Title as="h1" look="h3">
            <FormattedMessage id="app.team.h1" />
          </Title>
        </Row>
        <Row gutters>
          <Col xs="12" md="10" lg="9" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.project" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.scanr" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.topo" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.version" values={formating} />
          </Col>
          <Col xs="12" md="10" lg="9" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.team" values={formating} />
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  )
}