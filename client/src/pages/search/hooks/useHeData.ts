import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getTopics } from "../../../api/topics";

type TopicData = {
  TopicDetails: TopicsDetails,
}

type TopicsDetails = {
  id: string,
  title: string,
  identifier: string,
  callIdentifier: string,
  callTitle: string,
  publicationDateLong: number,
  hasForthcomingTopics: boolean,
  hasOpenTopics: boolean,
  allClosedTopics: boolean,
  keywords: string[],
  flags: string[],
  tags: string[],
}

export default function useHeData() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isFetching, isError, error } = useQuery<TopicData>({
    queryKey: ["he-call-data", id],
    queryFn: () => getTopics(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (searchParams.has('q')) return;
    if (data?.TopicDetails?.keywords?.length) {
      searchParams.set('q', data.TopicDetails.keywords?.join('|'))
      setSearchParams(searchParams)
    }
  }, [data, searchParams, setSearchParams]);


  const value = useMemo(
    () => ({ data: data?.TopicDetails, isFetching, isError, error }),
    [data, isFetching, isError, error]
  );
  return value;
}