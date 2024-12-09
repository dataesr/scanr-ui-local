import { Button, Container, Row, Text, useDSFRConfig } from "@dataesr/dsfr-plus"
import { NetworkContext } from "../../context"
import NetworkSearchBarGetStarted from "../search-bar/get-started"
import NetworkSelectModelGetStarted from "../select-model/get-started"
import NetworkSelectSourceGetStarted from "../select-source/get-started"
import NetworksHeader from "../header"
import { RawIntlProvider, createIntl } from "react-intl"
import { messages } from "../../config/messages"
import { useParams } from "react-router-dom"

function NetworkGetStartedHome() {
  const theme = document.documentElement.getAttribute("data-fr-theme")

  return (
    <Container>
      <Container className="fr-card">
        <Container
          className={`graph-background-${theme}`}
          style={{ display: "flex", maxWidth: "1000px", minHeight: "500px" }}
        >
          <Container className={`graph-title-${theme}`} style={{ maxWidth: "80%", alignSelf: "center" }}>
            <Row className="fr-mt-5w" horizontalAlign="center">
              <Text>
                {
                  "Bienvenue sur notre outil scientométrique d'exploration et d'analyser de documents bibliographiques issus de la recherche et de l'innovation."
                }
              </Text>
              <Text>
                {
                  "Il prends la forme d'une visualisation sous forme de réseaux, mettant en évidence les co-occurrences et les communautés présentes dans un corpus de documents."
                }
              </Text>
            </Row>
            <Row className="fr-mb-5w" horizontalAlign="center">
              <Button as="a" icon="arrow-right-line" iconPosition="right" variant="secondary" href="/networks">
                {"Accéder directement à l'outil"}
              </Button>
              <Button
                className="fr-ml-2w"
                as="a"
                icon="arrow-right-line"
                iconPosition="right"
                variant="primary"
                href="/networks/get-started/1"
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
  const { page } = useParams()

  switch (page) {
    case "0":
      return <NetworkGetStartedHome />
    case "1":
      return <NetworkSearchBarGetStarted />
    case "2":
      return <NetworkSelectSourceGetStarted />
    case "3":
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
