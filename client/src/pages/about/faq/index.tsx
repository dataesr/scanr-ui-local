import { useDSFRConfig, Accordion, Breadcrumb, Link, Col, Container, Row, Title, AccordionGroup } from '@dataesr/dsfr-plus';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';
import { questions } from './questions';

export default function FAQ() {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  const messages = {}
  if (!messages) return null;
  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <Container>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link>
            <FormattedMessage id="app.faq.breadcrumb.current" />
          </Link>
        </Breadcrumb>
        <Row>
          <Title as="h1" look="h3">
            <FormattedMessage id="app.faq.breadcrumb.current" />
          </Title>
        </Row>
        <Row gutters>
          <Col xs="12" className="fr-mb-2w">
            <Title as="h2" look="h5">
              <FormattedMessage id="app.faq.general.title" />
            </Title>
            <AccordionGroup>
              {
                questions.map((question, index) => (
                  <Accordion key={index} title={question.label[locale]}>
                    {intl.formatMessage({
                      id: question.key,
                      defaultMessage: question.definition[locale]
                    }, question?.formatting || {})}
                  </Accordion>
                ))
              }
            </AccordionGroup>
          </Col>
          <Col xs="12" className="fr-mb-2w">
            <Title as="h2" look="h5">
              <FormattedMessage id="app.faq.search.title" />
            </Title>
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  )
}
