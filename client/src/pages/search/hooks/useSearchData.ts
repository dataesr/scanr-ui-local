import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPublications } from "../../../api/publications/search";
import { searchAuthors } from "../../../api/authors/search";
import { searchOrganizations } from "../../../api/organizations/search";
import { searchProjects } from "../../../api/projects/search";
import { InfiniteResponse, InfiniteResult } from "../../../types/commons";
import { Author } from "../../../types/author";
import { Organization } from "../../../types/organization";
import { Project } from "../../../types/project";
import { Publication } from "../../../types/publication";
import useUrl from "./useUrl";

const API_MAPPING = {
  publications: searchPublications,
  authors: searchAuthors,
  projects: searchProjects,
  organizations: searchOrganizations,
}

type ObjectModel = Publication | Author | Project | Organization;

export default function useSearchData() {
  const { api, currentQuery, filters } = useUrl();
  const queryFn = API_MAPPING[api]
  const {
    data,
    error,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<InfiniteResponse<ObjectModel>, unknown, InfiniteResult<ObjectModel>>({
    queryKey: [api, currentQuery, filters],
    queryFn: ({ pageParam }) => queryFn({ cursor: pageParam, query: currentQuery, filters }),
    getNextPageParam: (lastPage) => (lastPage?.data?.length === 10) ? lastPage.cursor : undefined,
    initialPageParam: undefined,
    select: (data) => ({
      total: data.pages[0]?.total || 0,
      results: data.pages.flatMap((page) => page.data),
    }),
  })

  const values = useMemo(() => {
    return {
      total: data?.total,
      search: {
        data: data?.results,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetching,
      }
    }
  }, [data, error, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching])
  return values
}