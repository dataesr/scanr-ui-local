import { Container } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../context"
import useTrends from "../../hooks/useTrends"
import LineChart from "../line-chart"

export default function TrendsFocus() {
  const { view, focus, normalized } = useTrendsContext()
  const { trends } = useTrends()
  console.log("normalized", normalized)
  console.log("trends", trends)

  if (!trends || !focus) return null

  const data = trends?.[view]?.find((el) => el.label === focus)
  if (!data) return null

  return (
    <Container fluid className="fr-mt-3w">
      <LineChart data={data} normalized={normalized} source={"publications"} />
      <hr />
    </Container>
  )
}
