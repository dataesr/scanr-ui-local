import { Breadcrumb, Link, Autocomplete, Container, Col, Row, Title, Text } from '@dataesr/react-dsfr';
import Playground from '../../components/Playground';

const uncontrolled = `
<Autocomplete icon="arrow-down-s-line" label="Nom" items={[{label: "Hello", value: "HelloValue"}, {label: "Bye", value: "ByeValue"}]} />
`

export function Autocompletes() {
  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Autocomplete</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Autocomplete</Title>
          <Text>
            Permet une autocompletion
          </Text>
        </Col>
        <Col xs={12}>
          <Title as="h2" look="h4">État par défaut</Title>
          <Playground code={uncontrolled} scope={{ Autocomplete, Text }} defaultShowCode />
        </Col>
      </Row>
    </Container>
  )
}