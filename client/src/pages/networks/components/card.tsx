import { Container } from "@dataesr/dsfr-plus"
import NetworkGraph from "./graph"

export default function NetworkCard() {
  return (
    <Container
      className="fr-card"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "500px" }}
    >
      <NetworkGraph />
    </Container>
  )
}
