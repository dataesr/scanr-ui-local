import { Container, Text } from "@dataesr/dsfr-plus"
import { VOSviewerOnline } from "vosviewer-online"
import { Network } from "../../../api/types/network"
import { useMemo } from "react"

export function Graph({ network }: { network: Network }) {
  const theme = document.documentElement.getAttribute('data-fr-scheme')
  const parameters = {
    attraction: 1,
    largest_component: false,
    simple_ui: false,
    dark_ui: theme === "dark",
  }

  const key = useMemo(() => {
    if (network?.items?.length > 0) {
      return JSON.stringify({ network })
    }
  }, [network])

  if (!network) return (
    <Container className="fr-mt-5w" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "500px" }}>
      <Text>
        Loading data...
      </Text>
    </Container >
  )
  return (
    <Container key={key} className="fr-mt-5w" style={{ height: "500px" }}>
      <VOSviewerOnline
        data={{ network }}
        parameters={parameters}
      />
    </Container >
  )
}
