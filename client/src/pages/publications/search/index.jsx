import { useEffect } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Col, Container, Link, Row, Text } from "@dataesr/react-dsfr";
import { useInView } from 'react-intersection-observer';
import { searchPublications } from "../../../api/publications"
import Separator from "../../../components/separator";
import { MAX_PAGE_BEFORE_USER_CLICK } from "../../../config";
import PublicationFilters from "./components/filters";
import PublicationResults from "./components/results";
import { filtersFromUrlToElasticQuery } from "../../../utils/filters";
import Skeleton from "../../../components/skeleton";
import PublicationAnalytics from "./components/analytics";

export default function PublicationSearch() {
  const [searchParams] = useSearchParams();
  const [ref, inView] = useInView();
  const currentQuery = searchParams.get('q') || "";
  const filters = filtersFromUrlToElasticQuery(searchParams.get('filters'));
  const {
    data: publications,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['publications', currentQuery, filters],
    queryFn: ({ pageParam }) => searchPublications({ query: currentQuery, filters, cursor: pageParam }),
    getNextPageParam: (lastPage) => (lastPage?.data?.length === 10) ? lastPage.cursor : undefined,
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  const shouldClickToLoad = publications?.pages?.length >= MAX_PAGE_BEFORE_USER_CLICK || false;
  return (
    <>
      <Container fluid className="bg-grey">
        <Container>
          <PublicationFilters />
        </Container>
      </Container>
      <Container className="fr-mt-3w">
        <Row>
          <Col n="12 lg-7">
            {error && <Text><i>Une erreur est survenue au chargement des données</i></Text>}
            <PublicationResults publications={publications} />
            {(isFetchingNextPage || (hasNextPage && !shouldClickToLoad)) && <><Separator ref={ref} /><Skeleton header={false} /></>}
            {(!isFetchingNextPage && hasNextPage && shouldClickToLoad) && (
              <Separator className="fr-mt-8w">
                <Button icon="ri-arrow-down-s-line" secondary onClick={fetchNextPage}>
                  Plus de publications
                </Button>
              </Separator>
            )}
            {(!isFetchingNextPage && !hasNextPage) && (
              <>
                <Separator />
                <Text size="sm" className="fr-mb-4w">
                  Pour de meilleurs résultats, vous pouvez faire une recherche avancée.
                  <br />
                  Comment faire une
                  <Link as={<RouterLink to="/faq" />}>
                    {' '}
                    recherche avancée
                    {' '}
                  </Link>
                  sur scanR ?
                </Text>
              </>
            )}
          </Col>
          <Col n="12 lg-4 offset-lg-1">
            <PublicationAnalytics />
          </Col>
        </Row>
      </Container>
    </>
  )
}