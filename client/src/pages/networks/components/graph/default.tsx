import { Container, Text } from "@dataesr/dsfr-plus"
import NetworksSearchBar from "../header/search"

export default function NetworkGraphDefault() {
  return (
    <Container fluid style={{ width: "80%", backgroundColor: "white" }}>
      <Text>Commencez à explorer les réseaux de la recherche et de l'innovation</Text>
      <NetworksSearchBar isLarge />
    </Container>
  )
}
