import { useEffect } from "react"
import { useIntl } from "react-intl"
import { useInView } from "react-intersection-observer"
import { Button, ButtonGroup, Container } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import useOptions from "../../hooks/useOptions"
import { useTrendsContext } from "../../context"
import TrendsRankingItem from "./item"
import TrendsRankingHeader from "./header"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"

const ITEMS_PER_PAGE = 25

function TrendsRankingItems() {
  const intl = useIntl()
  const { sort } = useTrendsContext()
  const { currentPage, handlePageChange } = useOptions()
  const { trends, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, error } = useTrends()

  // useEffect(() => {
  //   if (trends?.pages?.[0]?.ranking?.[sort]?.length) {
  //     // fetchNextPage()
  //     console.log("trends items = ", trends?.pages?.[0]?.ranking?.[sort]?.length)
  //   }
  // }, [trends?.pages?.[0]?.ranking?.[sort]?.length])

  if (isFetching && !isFetchingNextPage) return <BaseSkeleton height="500px" />
  if (!trends?.pages || error) return <div>no data</div>

  const incudesPages = Math.ceil((trends?.pages?.[0]?.searchTotal || 0) / ITEMS_PER_PAGE)

  return (
    <>
      <div className="fr-accordions-group">
        {trends.pages.map((page) =>
          page.ranking?.[sort]
            // .filter((item) => item.label.toLowerCase().includes(startsWith))
            ?.map((item, index) => <TrendsRankingItem key={index} item={item} />)
        )}
      </div>
      {isFetchingNextPage && <BaseSkeleton height="300px" />}
      {/* {!isFetchingNextPage && !shouldChangePage && hasNextPage && <div ref={ref} />} */}
      {!isFetchingNextPage && (
        <Container fluid className="fr-mt-2w">
          <ButtonGroup isInlineFrom="xs" align="center">
            <Button
              variant="tertiary"
              icon="arrow-left-s-line"
              iconPosition="left"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {intl.formatMessage({ id: "trends.ranking.page-previous" })}
            </Button>
            {currentPage > 1 && (
              <Button variant="tertiary" onClick={() => handlePageChange(1)}>
                {1}
              </Button>
            )}
            {currentPage > 3 && <Button variant="tertiary">{"..."}</Button>}
            {currentPage > 2 && (
              <Button variant="tertiary" onClick={() => handlePageChange(currentPage - 1)}>
                {currentPage - 1}
              </Button>
            )}
            <Button variant="secondary">{currentPage}</Button>
            {currentPage < incudesPages - 1 && (
              <Button variant="tertiary" onClick={() => handlePageChange(currentPage + 1)}>
                {currentPage + 1}
              </Button>
            )}
            {currentPage < incudesPages - 2 && <Button variant="tertiary">{"..."}</Button>}
            {currentPage < incudesPages && (
              <Button variant="tertiary" onClick={() => handlePageChange(incudesPages)}>
                {incudesPages}
              </Button>
            )}
            <Button
              variant="tertiary"
              icon="arrow-right-s-line"
              iconPosition="right"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
            >
              {intl.formatMessage({ id: "trends.ranking.page-next" })}
            </Button>
          </ButtonGroup>
        </Container>
      )}
    </>
  )
}

export default function TrendsRanking() {
  return (
    <Container>
      <Container fluid className="fr-card">
        <TrendsRankingHeader />
        <TrendsRankingItems />
      </Container>
    </Container>
  )
}
