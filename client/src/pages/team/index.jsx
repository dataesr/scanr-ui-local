import { Breadcrumb, BreadcrumbItem, Col, Container, Row, Text, Title } from '@dataesr/react-dsfr';
import { FormattedMessage, IntlProvider } from 'react-intl';
import useLocals from '../../hooks/useLocals';

const formating = {
  h2: chunks => <Title as="h2" look="h4">{chunks}</Title>,
  p: chunks => <p>{chunks}</p>,
  ul: chunks => <ul>{chunks}</ul>,
  li: chunks => <li>{chunks}</li>,
  b: chunks => <b>{chunks}</b>,
  a: chunks => <a href="https://scanr.enseignementsup-recherche.gouv.fr/" target="_blank" rel="noopener noreferrer">{chunks}</a>,
  focus: chunks => <a href='/focus'>{chunks}</a>,
}

export default function Team() {
  const messages = useLocals('team')
  if (!messages) return null;
  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <Container>
        <Breadcrumb>
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem>
            <FormattedMessage id="app.team.breadcrumb" />
          </BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Title as="h1" look="h3">
            <FormattedMessage id="app.team.h1" />
          </Title>
        </Row>
        <Row gutters>
          <Col n="xs-12 md-10 lg-9 xl-8" className="fr-mb-2w">
            <FormattedMessage id="app.team.project" values={formating} />
          </Col>
          <Col n="xs-12 md-10 lg-9 xl-8" className="fr-mb-2w">
            <FormattedMessage id="app.team.scanr" values={formating} />
          </Col>
          <Col n="xs-12 md-10 lg-9 xl-8" className="fr-mb-2w">
            <FormattedMessage id="app.team.topo" values={formating} />
          </Col>
          <Col n="xs-12 md-10 lg-9 xl-8" className="fr-mb-2w">
            <FormattedMessage id="app.team.version" values={formating} />
          </Col>
          <Col n="xs-12 md-10 lg-9 xl-8" className="fr-mb-2w">
            <FormattedMessage id="app.team.team" values={formating} />
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  )
}