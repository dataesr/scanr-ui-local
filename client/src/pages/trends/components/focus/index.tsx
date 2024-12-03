import { Container } from "@dataesr/dsfr-plus"
// import { useTrendsContext } from "../../context"
import LineChart from "../line-chart"

export default function TrendsFocus({ item }) {
  // const { normalized } = useTrendsContext()

  return (
    <Container fluid className="fr-mt-3w">
      <LineChart data={item} normalized={false} source={"publications"} />
      <hr />
    </Container>
  )
}
