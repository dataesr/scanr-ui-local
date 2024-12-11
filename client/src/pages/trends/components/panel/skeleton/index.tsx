import { Container } from "@dataesr/dsfr-plus"
import TrendsViewHeader from "../header"
import BaseSkeleton from "../../../../../components/skeleton/base-skeleton"

export default function TrendsViewSkeleton() {
  return (
    <Container fluid>
      <TrendsViewHeader />
      <hr />
      <BaseSkeleton height="500px" />
    </Container>
  )
}
