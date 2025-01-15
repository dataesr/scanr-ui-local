import { Container } from "@dataesr/dsfr-plus"
import TrendsHeader from "../components/header"
import TrendsView from "../components/panel"
import TrendsOptionsBar from "../components/options-bar"
import TrendsOptionsModals from "../components/options-bar/modals"
import useIntegration from "../hooks/useIntegration"
import TrendsEvolutionChart from "../components/evolution-chart"

export default function TrendsLayout() {
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showTrendsOnly) return <TrendsView />

  return (
    <Container fluid>
      <TrendsHeader />
      <TrendsOptionsBar />
      <TrendsOptionsModals />
      <Container>
        <TrendsView />
      </Container>
      <TrendsEvolutionChart />
    </Container>
  )
}
