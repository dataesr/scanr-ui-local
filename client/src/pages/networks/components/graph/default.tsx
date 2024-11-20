import { useIntl } from "react-intl"
import { Container, Text } from "@dataesr/dsfr-plus"
import NetworksSearchBar from "../search-bar"

export default function NetworkGraphDefault() {
  const intl = useIntl()
  const theme = document.documentElement.getAttribute("data-fr-theme")

  return (
    <Container fluid className={`graph-background-${theme}`} style={{ display: "flex", width: "85%", height: "85%" }}>
      <Container className={`graph-title-${theme}`} style={{ alignSelf: "center" }}>
        <Text className="fr-mb-1w" size="lg">
          {intl.formatMessage({ id: "networks.search-bar.label-graph" })}
        </Text>
        <NetworksSearchBar isLarge />
      </Container>
    </Container>
  )
}
