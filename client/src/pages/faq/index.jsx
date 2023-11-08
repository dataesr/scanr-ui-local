import { Accordion, AccordionItem, Breadcrumb, BreadcrumbItem, Col, Container, Row, Title } from '@dataesr/react-dsfr';
import { FormattedMessage, IntlProvider } from 'react-intl';
import useLocals from '../../hooks/useLocals';

export default function FAQ() {
  const messages = useLocals('faq')
  if (!messages) return null;
  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <Container>
        <Breadcrumb>
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem>
            <FormattedMessage id="app.faq.breadcrumb.current" />
          </BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Title as="h1" look="h3">
            <FormattedMessage id="app.faq.breadcrumb.current" />
          </Title>
        </Row>
        <Row gutters>
          <Col n="12" className="fr-mb-2w">
            <Title as="h2" look="h5">
              <FormattedMessage id="app.faq.general.title" />
            </Title>
            <Accordion>
              <AccordionItem id="q1" title={<FormattedMessage id="app.faq.general.q1.title" />}>
                <FormattedMessage id="app.faq.general.q1.content" />
              </AccordionItem>
              <AccordionItem title={<FormattedMessage id="app.faq.general.q1.title" />}>
                <FormattedMessage id="app.faq.general.q1.content" />
              </AccordionItem>
            </Accordion>
          </Col>
          <Col n="12" className="fr-mb-2w">
            <Title as="h2" look="h5">
              <FormattedMessage id="app.faq.search.title" />
            </Title>
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  )
}
