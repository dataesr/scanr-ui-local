import { Stepper, Breadcrumb, Container, Title, Text, Row, Col, Link } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const stepper = `
<Stepper 
  currentStep={1}
  currentTitle="Première étape"
  nextStepTitle="Deuxième étape"
  steps={4}
  titleAs = 'h3'
/>
`;
const stepperLastStep = `
<Stepper 
  currentStep={4}
  currentTitle="Dernère étape"
  steps={4}
/>
`;

export function Steppers() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link>Indicateur d'étapes - Stepper</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Indicateur d'étapes - Stepper</Title>
          <Text>
            L’indicateur d'étapes permet d’indiquer à l’utilisateur où il
            se trouve dans un formulaire ou dans une démarche.
          </Text>
          <Text>
            Cet indicateur d'étapes est utilisable dans le cas d’un processus
            linéaire, le composant ne permet pas de naviguer d’une étape à une
            autre (pour cela, il faudra utiliser des boutons).
          </Text>
          <Playground code={stepper} scope={{ Stepper }} defaultShowCode />
          <Playground code={stepperLastStep} scope={{ Stepper }} />
        </Col>
      </Row>
    </Container>
  )
}