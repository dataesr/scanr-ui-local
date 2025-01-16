import { useEffect } from "react"
import { useIntl } from "react-intl"
import { useInView } from "react-intersection-observer"
import { Button, ButtonGroup, Container } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { useTrendsContext } from "../../context"
import useOptions from "../../hooks/useOptions"
import TrendsViewItem from "./item"
import TrendsViewHeader from "./header"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"

const scrollYTop = 200

function TrendsViewItems() {
  const intl = useIntl()
  const [ref, inView] = useInView()
  const { view } = useTrendsContext()
  const { currentPage, handlePageChange } = useOptions()
  const { trends, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, error } = useTrends()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isFetching && !isFetchingNextPage) return <BaseSkeleton height="500px" />
  if (!trends?.pages || error) return <div>no data</div>

  const shouldChangePage = trends.pageParams.length === 3

  return (
    <>
      <div className="fr-accordions-group">
        {trends.pages.map((page) => page.views?.[view].map((item, index) => <TrendsViewItem key={index} item={item} />))}
      </div>
      {isFetchingNextPage && <BaseSkeleton height="300px" />}
      {!isFetchingNextPage && !shouldChangePage && hasNextPage && <div ref={ref} />}
      {!isFetchingNextPage && shouldChangePage && (
        <Container fluid className="fr-mt-2w">
          <ButtonGroup isInlineFrom="xs" align="center">
            <Button variant="tertiary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              {intl.formatMessage({ id: "trends.views.page-previous" })}
            </Button>
            <Button
              variant="tertiary"
              onClick={() => {
                handlePageChange(currentPage + 1)
                window.scrollTo(0, scrollYTop)
              }}
              disabled={!hasNextPage}
            >
              {intl.formatMessage({ id: "trends.views.page-next" })}
            </Button>
          </ButtonGroup>
        </Container>
      )}
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
