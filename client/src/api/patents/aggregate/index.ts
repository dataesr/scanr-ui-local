import { postHeaders, patentsIndex } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { PatentAggregations } from "../../../types/patent";
import { fillWithMissingYears } from "../../utils/years";
import { FIELDS } from "../_utils/constants";

export async function aggregatePatents({
  query,
  filters = [],
}: AggregationArgs): Promise<PatentAggregations> {
  const body: any = {
    size: 0,
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
    aggs: {
      byType: {
        terms: {
          field: "type.keyword",
          size: 500,
        },
      },
      byYear: {
        terms: {
          field: "year",
          size: 25,
        },
      },
    },
  };
  if (filters.length > 0) {
    body.query.bool.filter = filters;
  }
  console.log(body);
  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
  const result = await res.json();
  const { aggregations: data } = result;
  const _100Year =
    data?.byYear?.buckets &&
    Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear =
    data?.byYear?.buckets
      ?.map((element) => {
        return {
          value: element.key,
          label: element.key,
          count: element.doc_count,
          normalizedCount: (element.doc_count * 100) / _100Year,
        };
      })
      .sort((a, b) => a.label - b.label)
      .reduce(fillWithMissingYears, []) || [];

  const byType =
    data?.byType?.buckets
      ?.map((element) => {
        return {
          value: element.key,
          label: element.key,
          count: element.doc_count,
        };
      })
      .filter((el) => el) || [];
  return { byYear, byType };
}
