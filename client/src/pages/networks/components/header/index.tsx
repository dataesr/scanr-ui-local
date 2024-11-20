import { Container } from "@dataesr/dsfr-plus"
import useIntegration from "../../hooks/useIntegration"
import NetworksBreadcrumb from "./breadcrumb"
import NetworkTitle from "../title"

export default function NetworksHeader() {
  const { integrationOptions } = useIntegration()
  const { showHeader } = integrationOptions

  if (showHeader === false) return null

  return (
    <Container className="bg-network" fluid>
      <Container className="fr-pt-4w">
        <NetworksBreadcrumb />
        <NetworkTitle />
      </Container>
    </Container>
  )
}
