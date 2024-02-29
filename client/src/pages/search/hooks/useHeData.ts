import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

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

  const { data, isFetching, isError } = useQuery<TopicData>({
    queryKey: ["he-call-data", id],
    queryFn: async () => {
      const res = await fetch(`https://scanr.dataesr.ovh/topics/${id}`);
      return res.json();
    },
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
    () => ({ data: data?.TopicDetails, isFetching, isError }),
    [data, isFetching, isError]
  );
  return value;
}