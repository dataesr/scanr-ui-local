import cs from 'classnames';
import { Accordion, Col, Row, Text, Title } from "@dataesr/dsfr-plus";
import useScreenSize from "../../hooks/useScreenSize";

type PageSectionProps = {
  children: React.ReactNode,
  title: string,
  description?: React.ReactNode,
  show: boolean,
  icon?: string,
  size?: "lead" | "lg"
}

export function PageSection({ children, title, icon, description = "", show = false, size = "lead" }: PageSectionProps) {
  const { screen } = useScreenSize();
  if (!show) {
    return null;
  }
  const titleCSS = cs({
    [`fr-text--${size}`]: size,
    [`fr-icon-${icon}`]: icon,
    "fr-mb-1v": description,
    "fr-mb-2w": !description,
  });
  const TitlePart = () => (
    <>
      <Title as="h2" className={titleCSS}>
        {title}
      </Title>
      <Text className="fr-card__detail fr-mb-2w" size="xs">
        {description}
      </Text>
    </>
  )
  if (["xs", "sm"].includes(screen)) {
    return (
      <Accordion title={title}>
        {children}
      </Accordion>
    );
  }
  return (
    <Col xs="12">
      <TitlePart />
      {children}
    </Col>
  );
}

export function PageContent({ children }: { children: React.ReactNode }) {
  const { screen } = useScreenSize();

  return (
    <Col xs="12">
      <Row gutters={!["xs", "sm"].includes(screen)}>
        {
          ["xs", "sm"].includes(screen)
            ? <ul className="fr-accordions-group">{children}</ul>
            : children
        }
      </Row>
    </Col>
  );
}