import { patentsIndex, postHeaders } from "../../../config/api";
import { LIGHT_SOURCE } from "../_utils/constants";

export async function getMorePatentsLikeThis(id: string) {
  const body = JSON.stringify({
    _source: LIGHT_SOURCE,
    size: 3,
    query: {
      more_like_this: {
        fields: ["publications.title.*"],
        like: [{ _id: id }],
        min_term_freq: 1,
        max_query_terms: 12,
      },
    },
  });
  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body,
    headers: postHeaders,
  });
  const data = await res.json();
  return data?.hits?.hits?.map(({ _source }) => _source) || [];
}
