import React from "react";
import { Col, Container, Link, Logo, Row, Title } from "@dataesr/dsfr-plus";
import { IntlProvider, createIntl } from "react-intl";

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

const locale = "fr";
const intl = createIntl({ locale, messages: messages[locale] });

export function Footer({
  children,
  fluid = false,
}: {
  children?: React.ReactNode;
  fluid?: boolean;
}) {
  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <footer className="fr-footer fr-mt-3w" role="contentinfo" id="footer">
        <div className="fr-footer__top">
          <Container>
            <Row gutters>
              <Col xs={12} lg={2}>
                <Title as="h3" className="fr-footer__top-cat">
                  {intl.formatMessage({
                    id: "layout.footer.top.about.help",
                  })}
                </Title>
                <ul className="fr-footer__top-list">
                  <li>
                    <Link className="fr-footer__top-link" href="/about/FAQ">
                      {intl.formatMessage({
                        id: "layout.footer.top.about.faq",
                      })}
                    </Link>
                  </li>
                  <li>
                    <Link className="fr-footer__top-link" href="/about/team">
                      {intl.formatMessage({
                        id: "layout.footer.top.about.team",
                      })}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="/about/resources"
                    >
                      {intl.formatMessage({
                        id: "layout.footer.top.about.resources",
                      })}
                    </Link>
                  </li>
                  {/* <li>
                      <Link
                        className="fr-footer__top-link"
                        href="/about/tutorial"
                      >
                        {intl.formatMessage({
                          id: "layout.footer.top.about.tutorial",
                        })}
                      </Link>
                    </li> */}
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="/about/glossary"
                    >
                      {intl.formatMessage({
                        id: "layout.footer.top.about.glossary",
                      })}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="/about/contact"
                    >
                      {intl.formatMessage({
                        id: "layout.footer.top.about.contact",
                      })}
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xs={12} lg={2}>
                <Title as="h3" className="fr-footer__top-cat">
                  {intl.formatMessage({
                    id: "layout.footer.top.about.also",
                  })}
                </Title>
                <ul className="fr-footer__top-list">
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://github.com/dataesr/scanr"
                      target="_blank"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://curiexplore.enseignementsup-recherche.gouv.fr/"
                      target="_blank"
                    >
                      CurieXplore
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://barometredelascienceouverte.esr.gouv.fr/"
                      target="_blank"
                    >
                      Baromètre de la Science Ouverte
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://data.esr.gouv.fr/FR/"
                      target="_blank"
                    >
                      #dataESR
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://data.enseignementsup-recherche.gouv.fr/pages/home/"
                      target="_blank"
                    >
                      Plateforme Open Data
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xs={12} lg={2}>
                <Title as="h3" className="fr-footer__top-cat">
                  {intl.formatMessage({
                    id: "layout.footer.top.about.follow",
                  })}
                </Title>
                <ul className="fr-footer__top-list">
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://github.com/dataesr/scanr"
                      target="_blank"
                      icon="twitter-x-fill"
                      iconPosition="left"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://www.linkedin.com/company/enseignementsup-recherche/"
                      target="_blank"
                      icon="linkedin-box-fill"
                      iconPosition="left"
                    >
                      Linkedin
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="fr-footer__top-link"
                      href="https://www.facebook.com/enseignementsup.recherche"
                      target="_blank"
                      iconPosition="left"
                      icon="facebook-circle-fill"
                    >
                      Facebook
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid={fluid}>{children}</Container>
      </footer>
    </IntlProvider>
  );
}

export function FooterBottom({
  children,
  copy,
}: {
  children?: React.ReactNode;
  copy?: React.ReactNode;
}) {
  const childs = React.Children.toArray(children);
  return (
    <div className="fr-footer__bottom">
      <ul className="fr-footer__bottom-list">
        {childs.map((child, i) => (
          <li key={i} className="fr-footer__bottom-item">
            {child}
          </li>
        ))}
      </ul>
      {copy ? (
        <div className="fr-footer__bottom-copy">
          <p>{copy}</p>
        </div>
      ) : null}
    </div>
  );
}

export function FooterBody({
  children,
  description,
}: {
  children?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const links = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Link
  );
  const logo = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Logo
  )?.[0];

  return (
    <div className="fr-footer__body">
      {logo ? (
        <div className="fr-footer__brand fr-enlarge-link">{logo}</div>
      ) : null}
      <div className="fr-footer__content">
        {description ? (
          <p className="fr-footer__content-desc">{description}</p>
        ) : null}
        {links.length ? (
          <ul className="fr-footer__content-list">
            {links.map((link, i) => (
              <li key={i} className="fr-footer__content-item">
                {link}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
