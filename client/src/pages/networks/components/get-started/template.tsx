import { Container, Row, Text } from "@dataesr/dsfr-plus"

export default function NetworkGetStartedPage({ title, children }) {
  return (
    <Container className="fr-mt-5w fr-mb-5w" style={{ maxWidth: "1000px" }}>
      <Row horizontalAlign="center">
        <Text size="lead">{title}</Text>
      </Row>
      {children}
    </Container>
  )
}
