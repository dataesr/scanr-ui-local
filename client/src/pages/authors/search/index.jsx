import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, } from "@dataesr/react-dsfr";
import { useInView } from 'react-intersection-observer';
import { filtersFromUrlToElasticQuery } from "../../../utils/filters";
import { searchAuthors } from "../../../api/authors";

export default function AuthorsSearch() {
  const [searchParams] = useSearchParams();
  const [ref, inView] = useInView();
  const currentQuery = searchParams.get('q') || "";
  const filters = filtersFromUrlToElasticQuery(searchParams.get('filters'));
  const {
    data: authors,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['publications', currentQuery, filters],
    queryFn: ({ pageParam }) => searchAuthors({ query: currentQuery, filters, cursor: pageParam }),
    getNextPageParam: (lastPage) => (lastPage?.data?.length === 10) ? lastPage.cursor : undefined,
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  // const shouldClickToLoad = publications?.pages?.length >= MAX_PAGE_BEFORE_USER_CLICK || false;
  if (error) return null;
  return (
    <>
      <Container fluid className="bg-grey">
      </Container>
      <Container className="fr-mt-3w">
        <pre><code>{authors && JSON.stringify(authors, null, 2)}</code></pre>
      </Container>
    </>
  )
}