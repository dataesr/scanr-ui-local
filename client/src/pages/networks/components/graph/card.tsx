import { Container } from "@dataesr/dsfr-plus"
import NetworkGraph from "."
import useIntegration from "../../hooks/useIntegration"

export default function NetworkCard() {
  const { integrationOptions } = useIntegration()

  return (
    <Container
      className="fr-card fr-mb-2w"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: integrationOptions.graphHeight }}
    >
      <NetworkGraph />
    </Container>
  )
}
