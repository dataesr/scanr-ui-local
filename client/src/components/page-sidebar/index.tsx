import { Accordion, Col, Row, Text, Title } from "@dataesr/dsfr-plus";
import useScreenSize from "../../hooks/useScreenSize";

export function PageSidebarItem({ children, title, description = "" }: { children: React.ReactNode, title: string, description?: React.ReactNode }) {
  const { screen } = useScreenSize();
  const TitlePart = () => (
    <Row>
      <Col xs="12">
        <Title as="h2" className={description ? " fr-text--lg fr-mb-1v" : " fr-text--lg fr-mb-2w"}>
          {title}
        </Title>
      </Col>
      <Col>
        <Text className="fr-card__detail fr-mb-2w" size="xs">
          {description}
        </Text>
      </Col>
    </Row>
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

export function PageSidebar({ children }) {
  const { screen } = useScreenSize();
  return (
    <Col md="4" xl="3" offsetXl="1">
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