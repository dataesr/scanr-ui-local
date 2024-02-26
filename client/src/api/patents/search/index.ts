import { patentsIndex, postHeaders } from "../../../config/api";
import {
  ElasticResult,
  SearchArgs,
  SearchResponse,
} from "../../../types/commons";
import { Patent } from "../../../types/patent";
import { FIELDS } from "../_utils/constants";

const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { id: { order: "desc" } },
];
const HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "title.default": {},
    "summary.default": {},
  },
};

export async function searchPatents({
  cursor,
  query,
  filters,
}: SearchArgs): Promise<SearchResponse<Patent>> {
  const body: any = {
    // _source: [
    //   "id",
    //   "title",
    //   "summary",
    //   "submissionDate",
    //   "publicationDate",
    //   "grantedDate",
    //   "authors.fullName",
    // ],
    sort: SORTER,
    highlight: HIGHLIGHT,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
      },
    },
  };
  if (filters) body.query.bool.filter = [...filters];
  if (cursor) body.search_after = cursor;
  if (!query)
    body.query = { function_score: { query: body.query, random_score: {} } };
  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`);
  }
  const json = await res.json();
  const nextCursor: string =
    json?.hits?.hits[json.hits.hits.length - 1]?.sort || "";
  const totalCount: number = json?.hits?.total?.value || 0;
  const data: ElasticResult<Patent>[] = json?.hits?.hits || [];
  return { data, cursor: nextCursor as string, total: totalCount };
}
