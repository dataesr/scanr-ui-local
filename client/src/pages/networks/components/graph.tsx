import { Container } from "@dataesr/dsfr-plus"
import { VOSviewerOnline } from "vosviewer-online"
import { Network } from "../../../api/types/network"

export function Graph({ network }: { network: Network }) {
  const config = {
    parameters: {
      attraction: 1,
      largest_component: false,
      simple_ui: false,
    },
  }

  const vosData = { network: network, config: config }
  console.log("vosData", vosData)

  return (
    <Container key={JSON.stringify(vosData)} className="fr-mt-5w" style={{ height: "500px" }}>
      <VOSviewerOnline data={vosData} />
    </Container>
  )
}
