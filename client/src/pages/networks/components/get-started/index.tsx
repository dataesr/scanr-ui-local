import { Button, Container, Row, Text, useDSFRConfig } from "@dataesr/dsfr-plus"
import { NetworkContext } from "../../context"
import NetworkSearchBarGetStarted from "../search-bar/get-started"
import NetworkSelectModelGetStarted from "../select-model/get-started"
import NetworksHeader from "../header"
import { RawIntlProvider, createIntl, useIntl } from "react-intl"
import { messages } from "../../config/messages"
import useGetStarted from "../../hooks/useGetStarted"
import useSearchDataPrefetch from "../../hooks/useSearchDataPrefetch"

function NetworkGetStartedHome() {
  const intl = useIntl()
  const { handlePageChange, navigateToNetwork } = useGetStarted()
  const theme = document.documentElement.getAttribute("data-fr-theme")

  useSearchDataPrefetch()

  return (
    <Container>
      <Container className="fr-card">
        <Container
          className={`graph-background-${theme}`}
          style={{ display: "flex", maxWidth: "1000px", minHeight: "500px" }}
        >
          <Container className={`graph-title-${theme}`} style={{ maxWidth: "80%", alignSelf: "center" }}>
            <Row className="fr-mt-5w" horizontalAlign="center">
              <Text>{intl.formatMessage({ id: "networks.get-started.home.text-1" })}</Text>
              <Text>{intl.formatMessage({ id: "networks.get-started.home.text-2" })}</Text>
            </Row>
            <Row className="fr-mb-5w" horizontalAlign="center">
              <Button icon="arrow-right-line" iconPosition="right" variant="secondary" onClick={() => navigateToNetwork()}>
                {"Accéder directement à l'outil"}
              </Button>
              <Button
                className="fr-ml-2w"
                icon="arrow-right-line"
                iconPosition="right"
                variant="primary"
                onClick={() => handlePageChange()}
              >
                {"Construire un réseau"}
              </Button>
            </Row>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

function NetworkGetStartedPages() {
  const { currentPage } = useGetStarted()

  switch (currentPage) {
    case "0":
      return <NetworkGetStartedHome />
    case "1":
      return <NetworkSearchBarGetStarted />
    // case "2":
    //   return <NetworkSelectSourceGetStarted />
    case "2":
      return <NetworkSelectModelGetStarted />
    default:
      return <NetworkGetStartedHome />
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
        <NetworkGetStartedPages />
      </NetworkContext>
    </RawIntlProvider>
  )
}
