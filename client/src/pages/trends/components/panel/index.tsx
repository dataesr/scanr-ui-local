import { Container } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { useTrendsContext } from "../../context"
import TrendsViewItem from "./item"
import TrendsViewHeader from "./header"
import TrendsViewSkeleton from "./skeleton"

function TrendsView() {
  const { view } = useTrendsContext()
  const { trends, isFetching, error } = useTrends()

  if (isFetching) return <TrendsViewSkeleton />

  if (!trends || !trends?.[view] || error) return <div>no data</div>

  const data = trends[view]

  return (
    <Container fluid>
      <TrendsViewHeader />
      <div className="fr-accordions-group">
        {data.map((item, index) => (
          <TrendsViewItem key={index} item={item} />
        ))}
      </div>
    </Container>
  )
}

export default function TrendsPanel() {
  return (
    <Container fluid className="fr-mr-2w">
      <TrendsView />
    </Container>
  )
}
