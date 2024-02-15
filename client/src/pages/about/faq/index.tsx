import {
  useDSFRConfig,
  Accordion,
  Breadcrumb,
  Link,
  Col,
  Container,
  Row,
  Title,
  AccordionGroup,
} from "@dataesr/dsfr-plus";
import { IntlProvider, createIntl } from "react-intl";
import { questions } from "./questions";

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

export default function FAQ() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  if (!messages) return null;

  const groupedQuestions = questions.reduce((grouped, question) => {
    const groupKey = question.groupkey;
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(question);
    console.log(grouped);
    return grouped;
  }, {});

  const formating = {
    aES: (chunks: any) => (
      <a
        href="https://www.elastic.co/\"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aC: (chunks: any) => (
      <a href="/contact" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aB: (chunks: any) => (
      <a
        href="https://bit.ly/2LKOWW6"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aWp: (chunks: any) => (
      <a
        href="https://bit.ly/38qctFD"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
  };

  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <Container>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link>
            {intl.formatMessage({ id: "app.faq.breadcrumb.current" })}
          </Link>
        </Breadcrumb>
        <Row>
          <Title as="h1">{intl.formatMessage({ id: "app.faq.title" })}</Title>
        </Row>
        {Object.entries(groupedQuestions).map(
          ([groupKey, groupQuestions]: [string, any[]]) => (
            <Row key={groupKey} gutters>
              <Col xs="12" className="fr-mb-2w">
                <Title as="h2" look="h5">
                  {intl.formatMessage({ id: `app.faq.${groupKey}.title` })}
                </Title>
                <AccordionGroup>
                  {groupQuestions.map((question: any, index: number) => (
                    <Accordion
                      key={index}
                      id={`question${question.key}`}
                      title={question.label[locale]}
                    >
                      {intl.formatMessage(
                        {
                          id: question.key,
                          defaultMessage: question.definition[locale],
                        },
                        { ...formating, ...question?.formatting }
                      )}
                    </Accordion>
                  ))}
                </AccordionGroup>
              </Col>
            </Row>
          )
        )}
        <a href="#questionq2">ici</a>
      </Container>
    </IntlProvider>
  );
}
