import { organizationsIndex, postHeaders } from "../../../config/api"
import { AggregationArgs } from "../../../types/commons"
import { OrganizationAggregations } from "../../../types/organization"
import { DEFAULT_FILTERS, FIELDS } from "../_utils/constants"

export async function aggregateOrganizations(
  {query, filters = []}: AggregationArgs
  ): Promise<OrganizationAggregations> {
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
      byNature: {
        terms: {
          field: "nature.keyword",
          size: 50,
        }
      },
      byLevel: {
        terms: {
          field: "level.keyword",
          size: 50,
        }
      },
      byKind: {
        terms: {
          field: "kind.keyword",
        }
      },
      byLocalization: {
        terms: {
          field: "address.urbanUnitLabel.keyword",
          size: 10
        },
      },
      byFundings: {
        terms: {
          field: "projects.type.keyword",
          size: 100
        },
      },
      byTags: {
        terms: {
          field: "badges.label.fr.keyword",
          size: 100
        },
      },
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = [...filters, ...DEFAULT_FILTERS]
  } else {
    body.query.bool.filter = DEFAULT_FILTERS
  }
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;
  console.log("pgs", data.byGPS);
  
  const byKind = data?.byKind?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }) || [];
  const byNature = data?.byNature?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const byLevel = data?.byLevel?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const byFundings = data?.byFundings?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const byTags = data?.byTags?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const byLocalization = data?.byLocalization?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  console.log("byLocalization", byLocalization);
  
  
  
  return { byKind, byNature, byLevel, byLocalization, byFundings, byTags}
}