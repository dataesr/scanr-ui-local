import { useRef, useState } from "react";
import {
  useDSFRConfig,
  Breadcrumb,
  Link,
  Col,
  Container,
  Row,
  SideMenu,
  SideMenuItem,
  Title,
} from "@dataesr/dsfr-plus";
import { RawIntlProvider, createIntl } from "react-intl";
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
  console.log(locale);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const accordionRef = useRef(null);

  const intl = createIntl({ locale, messages: messages[locale] });
  if (!messages) return null;

  const groupedQuestions = questions.reduce((grouped, question) => {
    const groupKey = question.groupkey;
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(question);
    return grouped;
  }, {});

  const handleQuestionClick = (questionId) => {
    console.log(questionId);
    setSelectedQuestion(questionId);
    if (accordionRef.current) {
      accordionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formating = {
    b: (chunks: any) => <b>{chunks}</b>,
    h2: (chunks: any) => (
      <Title as="h2" look="h5">
        {chunks}
      </Title>
    ),
    h3: (chunks: any) => (
      <Title as="h3" look="h6">
        {chunks}
      </Title>
    ),
    br: () => <br />,
    ul: (chunks: any) => <ul>{chunks}</ul>,
    li: (chunks: any) => <li>{chunks}</li>,

    aES: (chunks) => (
      <a
        href="https://www.elastic.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),

    aWiki: (chunks) => (
      <a
        href="https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Louvain"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aC: (chunks) => (
      <a href="contact" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aGit: (chunks) => (
      <a
        href="https://github.com/dataesr/affiliation-matcher"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aHal: (chunks) => (
      <a
        href="https://hal.science/hal-03365806/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aB: (chunks) => (
      <a
        href="https://bit.ly/2LKOWW6"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aWipo: (chunks) => (
      <a
        href="https://www.wipo.int/pct/en/faqs/faqs.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aEpo: (chunks) => (
      <a
        href="https://www.epo.org/searching-for-patents/helpful-resources/first-time-here/patent-families_fr.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aWp: (chunks) => (
      <a
        href="https://bit.ly/38qctFD"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aVos: (chunks) => (
      <a
        href="https://www.vosviewer.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aOpendata: (chunks) => (
      <a href="/" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
  };

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/"> {intl.formatMessage({ id: "app.faq.home" })}</Link>
          <Link>
            {intl.formatMessage({ id: "app.faq.breadcrumb.current" })}
          </Link>
        </Breadcrumb>
        <Row>
          <Title as="h1">{intl.formatMessage({ id: "app.faq.title" })}</Title>
        </Row>
        <Row>
          <Col xs={selectedQuestion ? "4" : "8"}>
            <SideMenu title="">
              {Object.entries(groupedQuestions).map(
                ([groupKey, groupQuestions]: [string, any[]]) => (
                  <SideMenuItem
                    key={groupKey}
                    title={intl.formatMessage({
                      id: `app.faq.${groupKey}.title`,
                    })}
                    defaultExpanded={false}
                  >
                    {groupQuestions.map((question: any) => (
                      <Link
                        key={question.key}
                        href={`#${question.key}`}
                        onClick={() => handleQuestionClick(question.key)}
                      >
                        {intl.formatMessage({
                          id: (question.label as any)[locale],
                        })}
                        {selectedQuestion === question.key && (
                          <span className="icon-container">
                            <i className="fr-fi fr-icon-questionnaire-fill" />
                          </span>
                        )}
                      </Link>
                    ))}
                  </SideMenuItem>
                )
              )}
            </SideMenu>
          </Col>
          <Col>
            {!selectedQuestion && (
              <div>
                <svg
                  className="fr-artwork"
                  aria-hidden="true"
                  viewBox="0 0 80 80"
                  width="100%"
                  height="100%"
                >
                  <use
                    className="fr-artwork-decorative"
                    href="/artwork/pictograms/system/information.svg#artwork-decorative"
                  />
                  <use
                    className="fr-artwork-minor"
                    href="/artwork/pictograms/system/information.svg#artwork-minor"
                  />
                  <use
                    className="fr-artwork-major"
                    href="/artwork/pictograms/system/information.svg#artwork-major"
                  />
                </svg>
              </div>
            )}
            {selectedQuestion && (
              <div className="fr-callout" ref={accordionRef}>
                <Title as="h2" className="fr-callout__title">
                  {intl.formatMessage({
                    id: questions.find((q) => q.key === selectedQuestion)
                      ?.label[locale],
                  })}
                </Title>
                <p className="fr-callout__text">
                  {intl.formatMessage(
                    {
                      id: selectedQuestion,
                      defaultMessage: questions.find(
                        (q) => q.key === selectedQuestion
                      )?.definition[locale],
                    },
                    {
                      ...formating,
                      ...questions.find((q) => q.key === selectedQuestion)
                        ?.formating,
                    }
                  )}
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </RawIntlProvider>
  );
}
