import { authorsIndex, postHeaders } from "../../../config/api";
import { LightAuthor } from "../../../types/author";
import { SearchArgs, SearchResponse, ElasticResult } from "../../../types/commons";
import { FIELDS } from "../_utils/constants";

const SOURCE = [
  "id", "fullName", "domains", "orcid",
  "idref", "recent_affiliations", "topDomains",
]
const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { "id.keyword": { order: "desc" } }
]
const HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "publications.title.default": {},
    "publications.summary.default": {},
    "domains.label.default": {},
  }
}
export async function searchAuthors({ cursor, query, filters, size }: SearchArgs): Promise<SearchResponse<LightAuthor>> {
  const body: any = {
    _source: SOURCE,
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
  if (filters) body.query.bool.filter = filters
  if (size) body.size = size;
  if (cursor) body.search_after = cursor;
  if (!query) body.query = { function_score: { query: body.query, random_score: {} }}
  const res = await fetch(
    `${authorsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const nextCursor: string = data?.hits?.hits[data.hits.hits.length - 1]?.sort || ""
  const totalCount: number = data?.hits?.total?.value || 0;
  const authors: ElasticResult<LightAuthor>[] = data?.hits?.hits || []  
  
  return { data: authors, cursor: nextCursor as string, total: totalCount }
}