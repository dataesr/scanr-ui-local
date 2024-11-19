import { Container } from "@dataesr/dsfr-plus"
import { Network } from "../../../../../types/network"
import { VOSviewerOnline } from "vosviewer-online"

type OrganizationNetworkProps = {
  data: Network
  value: string
  label?: string
}

export default function OrganizationNetwork({ data: network, value, label }: OrganizationNetworkProps) {
  if (!network) return null

  const theme = document.documentElement.getAttribute("data-fr-scheme")
  const parameters = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: true,
  }

  return (
    <Container fluid style={{ height: "400px" }}>
      <VOSviewerOnline key={value} data={network} parameters={parameters} />
    </Container>
  )
}
