import { Container, Title, Row, Col, Breadcrumb, Link } from '@dataesr/react-dsfr';
export function QuickStart() {

  return (
    <Container fluid className="fr-mb-5w">
      <Row>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link href="/composants">Composants</Link>
          <Link aria-current="page">Guide de migration</Link>
        </Breadcrumb>
      </Row>
      <Row gutters>
        <Col xs={12}>
          <Title as="h1">Guide de migration</Title>
          <Title as="h2">Passer en version 2.0</Title>
        </Col>
      </Row>
    </Container>
  )
}
