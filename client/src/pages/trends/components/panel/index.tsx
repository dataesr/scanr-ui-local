import { Button, Container } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { useTrendsContext } from "../../context"
import TrendsViewItem from "./item"
import TrendsViewHeader from "./header"
import Separator from "../../../../components/separator"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"

function TrendsViewItems() {
  const { view } = useTrendsContext()
  const { trends, fetchNextPage, isFetching, error } = useTrends()

  console.log(trends?.pages, trends?.pageParams, isFetching, error)

  if (isFetching) return <BaseSkeleton height="500px" />

  if (!trends?.pages || error) return <div>no data</div>

  return (
    <>
      <div className="fr-accordions-group">
        {trends.pages.map((page) => page?.[view].map((item, index) => <TrendsViewItem key={index} item={item} />))}
      </div>
      <Separator className="fr-my-2w">
        <Button icon="arrow-down-s-line" variant="text" onClick={() => fetchNextPage()}>
          See more
        </Button>
      </Separator>
    </>
  )
}

export default function TrendsView() {
  return (
    <Container fluid className="fr-card">
      <TrendsViewHeader />
      <TrendsViewItems />
    </Container>
  )
}
