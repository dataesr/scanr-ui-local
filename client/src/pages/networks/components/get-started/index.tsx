import { Button, Container, Row, Text, useDSFRConfig } from "@dataesr/dsfr-plus"
import { NetworkContext } from "../../context"
import NetworkSearchBarGetStarted from "../search-bar/get-started"
import NetworkSelectModelGetStarted from "../select-model/get-started"
import NetworkSelectSourceGetStarted from "../select-source/get-started"
import NetworksHeader from "../header"
import { RawIntlProvider, createIntl } from "react-intl"
import { messages } from "../../config/messages"
import { useParams } from "react-router-dom"

function NetworkGetStartedButton() {
  return (
    <Container style={{ maxWidth: "1000px" }}>
      <Row horizontalAlign="center">
        <Text>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
        </Text>
      </Row>
      <Row horizontalAlign="center">
        <Button as="a" icon="arrow-right-line" iconPosition="right" href="/networks/get-started/1">
          {"Créer un réseau"}
        </Button>
      </Row>
    </Container>
  )
}

function NetworkGetStartedPages() {
  const { page } = useParams()

  switch (page) {
    case "0":
      return <NetworkGetStartedButton />
    case "1":
      return <NetworkSearchBarGetStarted />
    case "2":
      return <NetworkSelectSourceGetStarted />
    case "3":
      return <NetworkSelectModelGetStarted />
    default:
      return <NetworkGetStartedButton />
  }
}

export default function NetworksGetStarted() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })

  return (
    <RawIntlProvider value={intl}>
      <NetworkContext>
        <NetworksHeader />
        {/* <NetworksOptionsBar /> */}
        <Container>
          <Container className="fr-card" style={{ minHeight: "500px", justifyContent: "center" }}>
            <NetworkGetStartedPages />
          </Container>
        </Container>
      </NetworkContext>
    </RawIntlProvider>
  )
}
