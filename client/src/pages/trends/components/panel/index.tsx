import { Container } from "@dataesr/dsfr-plus"
import LineChart from "../line-chart"

export default function TrendsPanel({ data }) {
  return (
    <Container className="fr-card">
      <Container className="fr-mt-2w">
        <LineChart data={data.byCount[0]} />
      </Container>
    </Container>
  )
}
