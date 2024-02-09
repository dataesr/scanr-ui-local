import React from "react";
import { Container, Link, Logo } from "@dataesr/dsfr-plus";

export function Footer({
  children,
  fluid = false,
}: {
  children?: React.ReactNode;
  fluid?: boolean;
}) {
  return (
    <footer className="fr-footer fr-mt-8w" role="contentinfo" id="footer">
      <div className="fr-footer__top">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--start fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <h3 className="fr-footer__top-cat">Aide</h3>
              <ul className="fr-footer__top-list">
                <li>
                  <Link className="fr-footer__top-link" href="/about/FAQ">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="fr-footer__top-link" href="#">
                    Glossaire
                  </Link>
                </li>
                <li>
                  <Link className="fr-footer__top-link" href="/about/team">
                    L'équipe
                  </Link>
                </li>
                <li>
                  <Link className="fr-footer__top-link" href="/about/resources">
                    Sources de données
                  </Link>
                </li>
                <li>
                  <Link className="fr-footer__top-link" href="/about/tutorial">
                    Tutoriel
                  </Link>
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <h3 className="fr-footer__top-cat">Nom de la catégorie</h3>
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
                    href="about/glossary"
                    target="_blank"
                  >
                    Glossaire
                  </Link>
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <h3 className="fr-footer__top-cat">Nom de la catégorie</h3>
              <ul className="fr-footer__top-list">
                <li>
                  <Link className="fr-footer__top-link" href="#">
                    Lien de navigation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <h3 className="fr-footer__top-cat">Nom de la catégorie</h3>
              <ul className="fr-footer__top-list">
                <li>
                  <Link className="fr-footer__top-link" href="#">
                    Lien de navigation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <h3 className="fr-footer__top-cat">Nom de la catégorie</h3>
              <ul className="fr-footer__top-list">
                <li>
                  <Link className="fr-footer__top-link" href="#">
                    Lien de navigation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-sm-3 fr-col-md-2">
              <h3 className="fr-footer__top-cat">Nom de la catégorie</h3>
              <ul className="fr-footer__top-list">
                <li>
                  <Link className="fr-footer__top-link" href="#">
                    Lien de navigation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Container fluid={fluid}>{children}</Container>
    </footer>
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
