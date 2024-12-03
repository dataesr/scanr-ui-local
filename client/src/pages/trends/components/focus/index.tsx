import { Container } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../context"
import usePublicationsTrends from "../../hooks/usePublicationsTrends"
import LineChart from "../line-chart"

export default function TrendsFocus() {
  const { focus, view } = useTrendsContext()
  const { trends } = usePublicationsTrends()

  if (!trends || !focus) return null

  const data = trends?.[view]?.find((el) => el.label === focus)
  if (!data) return null

  return (
    <Container fluid className="fr-mt-5w">
      <LineChart data={data} normalized={true} source={"publications"} />
    </Container>
  )
}
