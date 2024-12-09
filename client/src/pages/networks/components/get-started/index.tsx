import { Button, Container, Row, Text } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context"
import NetworkSearchBarGetStarted from "../search-bar/get-started"
import NetworkSelectModelGetStarted from "../select-model/get-started"
import NetworkSelectSourceGetStarted from "../select-source/get-started"

function NetworkGetStartedButton() {
  const { setGetStartedPage } = useNetworkContext()
  return (
    <Container>
      <Row horizontalAlign="center">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </Row>
      <Row horizontalAlign="center">
        <Button onClick={() => setGetStartedPage(1)}>Get Started</Button>
      </Row>
    </Container>
  )
}

function NetworkGetStartedPages() {
  const { getStartedPage } = useNetworkContext()

  switch (getStartedPage) {
    case 0:
      return <NetworkGetStartedButton />
    case 1:
      return <NetworkSearchBarGetStarted />
    case 2:
      return <NetworkSelectSourceGetStarted />
    case 3:
      return <NetworkSelectModelGetStarted />
    default:
      return <NetworkGetStartedButton />
  }
}

export default function NetworkGetStarted() {
  return (
    <Container className="fr-card" style={{ minHeight: "350px", justifyContent: "center" }}>
      <NetworkGetStartedPages />
    </Container>
  )
}
