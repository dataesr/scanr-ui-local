import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPublications } from "../../api/publications/search";
import { useCallback, useMemo } from "react";
import { LightPublication } from "../../types/publication";
import { ElasticResult, SearchResponse } from "../../types/commons";


type InfiniteResponse = SearchResponse<LightPublication>
type InfiniteResult = {
  total: number,
  results: ElasticResult<LightPublication>[]
}

export default function useData(id) {
  console.log(id);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || "";
  const {
    data,
    error,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<InfiniteResponse, unknown, InfiniteResult>({
    queryKey: ["publications", currentQuery],
    queryFn: ({ pageParam }) => searchPublications({cursor: pageParam, query: currentQuery}),
    getNextPageParam: (lastPage) => (lastPage?.data?.length === 10) ? lastPage.cursor : undefined,
    initialPageParam: undefined,
    select: (data) => ({
      total: data.pages[0]?.total || 0,
      results: data.pages.flatMap((page) => page.data),
    }),
  })

  const handleQueryChange = useCallback((query) => {
    setSearchParams({ q: query })
  }, [setSearchParams])

  

  const values = useMemo(() => {
    return {
      handleQueryChange,
      total: data?.total,
      currentQuery,
      search: {
        data: data?.results,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetching,
      }
    }
  }, [
    data, error, isFetchingNextPage, fetchNextPage,
    hasNextPage, handleQueryChange,
    isFetching, currentQuery
  ])

  return values
}