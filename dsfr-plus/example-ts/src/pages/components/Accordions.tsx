import { Accordion, AccordionGroup, Container, Title, Text, Row, Col, Breadcrumb, Link } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const accodion = `
<Accordion title="Mon accordéon" titleAs="h3">
  Je suis le contenu de l'accordéon
</Accordion>
`;

const accodionDefaultExpanded = `
<Accordion defaultExpanded title="Mon accordéon" titleAs="h3">
  Je suis le contenu de l'accordéon
</Accordion>
`;
const accodionGroup = `
<AccordionGroup>
  <Accordion title="Mon accordéon" titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
    <Accordion title="Mon accordéon" titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
    <Accordion title="Mon accordéon" titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
</AccordionGroup>
`;

const independantAccordionGroup = `
<>
  <Accordion title="Mon accordéon" titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
  <Accordion title="Mon accordéon" titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
</>
`;

const handleExpandedStatus = `
<AccordionGroup>
  <Accordion title={(expanded) => expanded ? "Masquer le contenu" : "Afficher le contenu"} titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
    <Accordion title={(expanded) => expanded ? "Masquer le contenu" : "Afficher le contenu"} titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
    <Accordion title={(expanded) => expanded ? "Masquer le contenu" : "Afficher le contenu"} titleAs="h3">
    Je suis le contenu de l'accordéon
  </Accordion>
</AccordionGroup>
`;

export function Accordions() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Accordéon - Accordion</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Accordéon - Accordion</Title>
          <Text>
            Les accordéons permettent aux utilisateurs d'afficher et de masquer des sections de contenu présentés dans une page.
          </Text>
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Accordéon seul</Title>
          <Playground code={accodion} scope={{ Accordion }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Accordéon ouvert par default</Title>
          <Playground code={accodionDefaultExpanded} scope={{ Accordion }} defaultShowCode />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Groupes d'accordéons</Title>
          <Text>
            Les groupes d'accordéons permettent de masquer automatiquement un accordéon lorsqu'un autre s'ouvre.
            Wrappez simplement vos accordéons dans un composant `AccordionGroup`
          </Text>
          <Playground code={accodionGroup} scope={{ Accordion, AccordionGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Groupes d'accordéons indépendants</Title>
          <Text>
            Si vous souhaitez garder les accordéon ouverts même losqu'un autre s'ouvre, utilisez des accordéons indépendants
          </Text>
          <Playground code={independantAccordionGroup} scope={{ Accordion, AccordionGroup }} />
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">Changer le titre de l'accordéon</Title>
          <Text>
            Vous pouvez gérer le titre de l'accordéon en fonction de son état `ouvert/fermé`, en utilisant un callback pour la propriété title.
          </Text>
          <Playground code={handleExpandedStatus} scope={{ Accordion, AccordionGroup }} />
        </Col>
      </Row>
    </Container>
  )
}