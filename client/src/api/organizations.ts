import { publicationTypeMapping } from '../utils/string'
import { organizationsIndex, patentsIndex, postHeaders, projectsIndex, publicationsIndex } from './config'
import { ElasticResult, SearchArgs, SearchResponse } from './types/commons'
import { Organization, OrganizationAggregations } from './types/organization'

const SEARCH_SOURCE = ["label.*", "acronym.*", "address.main", "address.city", "kind", "level", 'nature', 'id', "creationYear", "isFrench", "active"]
const SEARCH_FIELDS = ["label.*^3", "acronym.*^3", "publications.title.default^2", "publications.summary.default"]
const SEARCH_SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { "id.keyword": { order: "desc" } }
]
const SEARCH_HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "label.default": {},
    "acronym.default": {},
    "publications.title.default": {},
    "publications.summary.default": {},
  }
}

const DEFAULT_SEARCH_FILTERS = [
  { term: { isFrench: true } },
  { term: { status: "active" } },
]


export async function searchOrganizations({ cursor, query, filters }: SearchArgs): Promise<SearchResponse<Organization>> {
  const body: any = {
    _source: SEARCH_SOURCE,
    sort: SEARCH_SORTER,
    highlight: SEARCH_HIGHLIGHT,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              fields: SEARCH_FIELDS,
            },
          }
        ]
      }
    },
  }
  if (filters) body.query.bool.filter = [...filters, ...DEFAULT_SEARCH_FILTERS]
  if (cursor) body.search_after = cursor;
  if (!query) body.query = { function_score: { query: body.query, random_score: {} }}
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const nextCursor: string = json?.hits?.hits[json.hits.hits.length - 1]?.sort || ""
  const totalCount: number = json?.hits?.total?.value || 0;
  const data: ElasticResult<Organization>[] = json?.hits?.hits || []
  return { data, cursor: nextCursor as string, total: totalCount }
}

export async function getOrganizationById(id: string): Promise<Organization> {
  const body: any = {
    _source: {
      excludes: ["publications", "projects"]
    },
    query: {
      bool: {
        filter: [{term: { "id.keyword": id }}]
      }
    },
  }
  const structureQuery = fetch(`${organizationsIndex}/_search?q=id:"${id}"`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
    .then(r => r.json())
  const publicationsQuery = getStructurePublicationsById(id)
  const projectsQuery = getStructureProjectsById(id)
  const patentsQuery = getStructurePatentsById(id)
  const [structure, publications, projects, patents] = await Promise.all([structureQuery, publicationsQuery, projectsQuery, patentsQuery])
  
  const structureData = structure?.hits?.hits?.[0]?._source || {}
  const { _id } = structure?.hits?.hits?.[0] || {}
  
  return { ...structureData, _id, publications, projects, patents }
}

export async function getStructurePublicationsById(id: string): Promise<any> {
  const body = {
    _source: ["title.*", "authors.fullName", "authors.person", "authors.role", "source.*", "isOa", 'type', 'id', 'year'],
    query: { bool: { filter: [{ term: { "affiliations.id.keyword": id } }] } },
    sort: [{ year: { order: "desc" } }],
    aggs: {
      byWiki: {
        filter: { term: { "domains.type.keyword": "wikidata" } },
        aggs: {
          wiki: {
            terms: {
              size: 40,
              field: "domains.label.default.keyword",
            }
          }
        }
      },
      byYear: {
        terms: {
          field: "year",
        }
      },
      byPublicationType: {
        terms: {
          field: "type.keyword",
        }
      },
      byAuthors: {
        terms: {
          field: "authors.id_name.keyword",
          size: 10,
        },
      },
      byIsOa: {
        terms: {
          field: "isOa",
        }
      },
      bySource: {
        terms: {
          field: "source.title.keyword",
        }
      },
    },
    size: 0,
  }
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  
  const aggregations = data?.aggregations || {}
  const publicationsCount = data?.hits?.total?.value || 0
  const byWiki = aggregations?.byWiki?.wiki?.buckets?.map((element) => {
    return {
      value: element.key,
      count: element.doc_count,
      label: element.key,
    }
  }) || [];
  const _100Year = aggregations?.byYear?.buckets && Math.max(...aggregations.byYear.buckets.map((el) => el.doc_count));
  const byYear = aggregations?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count * 100 / _100Year,
    }
  }) || [];
  const byType = aggregations?.byPublicationType?.buckets?.map((element) => {
    if (!publicationTypeMapping[element?.key]) return null;
    return {
      value: element.key,
      label: publicationTypeMapping[element.key],
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const _100Source = aggregations?.bySource?.buckets && Math.max(...aggregations.bySource.buckets.map((el) => el.doc_count));
  const bySource = aggregations?.bySource?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Source,
    }
  }).filter(el => el) || [];
  const _100Authors = aggregations?.byAuthors?.buckets && Math.max(...aggregations.byAuthors.buckets.map((el) => el.doc_count));
  const byAuthors = aggregations?.byAuthors?.buckets?.map((element) => {
    return {
      value: element.key.split('###')?.[0],
      label: element.key.split('###')?.[1],
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Authors,
    }
  }).filter(el => el) || [];
  const _100IsOa = aggregations?.byIsOa?.buckets.reduce((acc, cur) => acc + cur.doc_count, 0);
  const byIsOa = aggregations?.byIsOa?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key_as_string,
      count: Math.ceil(element.doc_count * 100 / _100IsOa),
    }
  }
  ).filter(el => el) || [];
  
  return { publicationsCount, byYear, byType, bySource, byAuthors, byIsOa, byWiki } || {}
}

export async function getStructureProjectsById(id: string): Promise<any> {
  const body: any = {
    size: 0,
    query: { bool: { filter: [{ term: { "participants.structure.id.keyword": id } }] } },
    aggs: {
      byType: {
        terms: {
          field: "type.keyword",
          size: 500,
        }
      },
      byYear: {
        terms: {
          field: "year",
        }
      },
      byKeywordsFr: {
        terms: {
          field: "keywords.fr.keyword",
          size: 50,
        },
      },
      byKeywordsEn: {
        terms: {
          field: "keywords.en.keyword",
          size: 50,
        },
      },
    }
  }
  const res = await fetch(
    `${projectsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  
  const { aggregations: data} = result;
  const projectsCount = result?.hits?.total?.value || 0
  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count * 100 / _100Year,
    }
  }) || [];
  const _100Type = data?.byType?.buckets && Math.max(...data.byType.buckets.map((el) => el.doc_count));
  const byType = data?.byType?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Type,
    }
  }).filter(el => el) || [];
  const keywordsBuckets = [...data?.byKeywordsFr?.buckets || [], ...data?.byKeywordsEn?.buckets || []];

  const byKeywords = keywordsBuckets.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el).sort((a, b) => a.count - b.count).slice(0, 30) || [];
  return { byYear, byType, byKeywords, projectsCount }
}

export async function getStructurePatentsById(id: string): Promise<any> {
  const body: any = {
    size: 0,
    query: { bool: { filter: [{ term: { "affiliations.id.keyword": id } }] } },
    aggs: {
      byYear: {
        terms: {
          field: "year",
        }
      }
    }
  }
  const res = await fetch(
    `${patentsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  
  const { aggregations: data} = result;
  const patentsCount = result?.hits?.total?.value || 0
  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count * 100 / _100Year,
    }
  }) || [];
  return { byYear, patentsCount }
}

export async function getOrganizationFilters(
  query: string,
  filters: Record<string, unknown>[] = []
  ): Promise<OrganizationAggregations> {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              // fields: SEARCH_FIELDS,
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
          field: "address.localisationSuggestions.keyword",
        },
      },
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = [...filters, ...DEFAULT_SEARCH_FILTERS]
  } else {
    body.query.bool.filter = DEFAULT_SEARCH_FILTERS
  }
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;
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

  const byLocalization = data?.byLocalization?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  
  return { byKind, byNature, byLevel, byLocalization }
}
