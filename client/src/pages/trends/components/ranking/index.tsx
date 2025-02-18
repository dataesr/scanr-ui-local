import { Container } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { useTrendsContext } from "../../context"
import TrendsRankingItem from "./item"
import TrendsRankingHeader from "./header"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"
import { TrendsRankingFooter } from "./footer"

function TrendsRankingItems() {
  const { sort, includes } = useTrendsContext()
  const { trends, isFetching, error } = useTrends()

  if (!trends && isFetching) return <BaseSkeleton height="500px" />
  if (!trends?.ranking || error) return <div>no data</div>

  const items = includes
    ? trends.ranking[sort].filter((item) => item.label.toLowerCase().includes(includes))
    : trends.ranking[sort]

  return (
    <Container fluid>
      <div className="fr-accordions-group">
        {items.map((item) => (
          <TrendsRankingItem key={item.id} item={item} />
        ))}
      </div>
      {isFetching && <BaseSkeleton height="500px" />}
    </Container>
  )
}

export default function TrendsRanking() {
  return (
    <Container>
      <Container fluid className="fr-card">
        <TrendsRankingHeader />
        <TrendsRankingItems />
        <TrendsRankingFooter />
      </Container>
    </Container>
  )
}
