import { publicationsIndex, postHeaders } from "../../../config/api";
import { SearchArgs, SearchResponse, ElasticResult } from "../../../types/commons";
import { LightPublication } from "../../../types/publication";
import { FIELDS, LIGHT_SOURCE } from "../_utils/constants";

const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { year: { order: "desc" } }
]
const HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "title.default": {},
    "summary.default": {},
    "domains.label.default": {},
  }
}

export async function searchPublications({ cursor, query, filters, size }: SearchArgs): Promise<SearchResponse<LightPublication>> {
  const body: any = {
    _source: LIGHT_SOURCE,
    sort: SORTER,
    highlight: HIGHLIGHT,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              fields: FIELDS,
            },
          }
        ]
      }
    },
  }
  if (filters) body.query.bool.filter = filters;
  if (size) body.size = size;
  if (cursor) body.search_after = cursor;
  if (!query) body.query = { function_score: { query: body.query, random_score: {} }}
  const res = await fetch(
    `${publicationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const nextCursor: string = data?.hits?.hits[data.hits.hits.length - 1]?.sort || ""
  const totalCount: number = data?.hits?.total?.value || 0;
  const publications: ElasticResult<LightPublication>[] = data?.hits?.hits || []
  return { data: publications, cursor: nextCursor as string, total: totalCount }
}