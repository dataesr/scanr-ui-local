import { Button, Container, Row, Text } from "@dataesr/dsfr-plus"
import useGetStarted from "../../hooks/useGetStarted"

export default function NetworkGetStartedPage({ title, children }) {
  const { navigateToNetwork } = useGetStarted()

  return (
    <Container>
      <Container className="fr-card">
        <Container style={{ minHeight: "400px", alignContent: "center" }}>
          <Container className="fr-mt-5w" style={{ maxWidth: "800px" }}>
            <Row horizontalAlign="center">
              <Text size="lead">{title}</Text>
            </Row>
            {children}
          </Container>
        </Container>
        <Container className="fr-mt-4w fr-mb-2w">
          <Row horizontalAlign="center" verticalAlign="bottom">
            <Button iconPosition="right" onClick={() => navigateToNetwork()} icon="arrow-right-line" variant="secondary">
              {"Accéder directement à l'outil"}
            </Button>
          </Row>
        </Container>
      </Container>
    </Container>
  )
}
