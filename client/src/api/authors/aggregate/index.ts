import { FIELDS } from '../_utils/constants';
import { postHeaders, authorsIndex } from '../../../config/api';
import { AuthorsAggregations } from '../../../types/author';
import { AggregationArgs } from '../../../types/commons';

export async function aggregateAuthors({query, filters = []}: AggregationArgs): Promise<AuthorsAggregations> {
  const body: any = {
    size: 0,
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
    aggs: {
      byAward: {
        terms: {
          field: "awards.label.keyword",
          size: 500,
        }
      },
    }
  }
  if (filters.length > 0) { body.query.bool.filter = filters }
  const res = await fetch(
    `${authorsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;
  const byAward = data?.byAward?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }) || [];
  
  return { byAward }
}