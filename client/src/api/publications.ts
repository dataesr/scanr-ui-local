import { publicationTypeMapping } from '../utils/string'
import { publicationsIndex, headers, postHeaders } from './config'
import { ElasticResult, SearchArgs, SearchResponse } from './types/commons'
import { Publication, PublicationAggregations } from './types/publication'

const SEARCH_SOURCE = ["title.*", "authors.fullName", "authors.person", "source.*", "isOa", 'type', 'id', "year"]
const SEARCH_FIELDS = ["title.*^3", "authors.fullName^3", "summary.*^2", "domains.label.*^2"]
const SEARCH_SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { year: { order: "desc" } }
]
const SEARCH_HIGHLIGHT = {
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


export async function getPublicationById(id: string): Promise<Publication> {
  const res = await fetch(`${publicationsIndex}/_search?q=id:"${id}"`, { headers })
  const data = await res.json()
  return { ...data?.hits?.hits?.[0]?._source, _id: data?.hits?.hits?.[0]._id } || {}
}

export async function getAuthorsPublicationsById(id: string) {
  const body = {
    _source: SEARCH_SOURCE,
    query: { bool: { filter: [{ terms: { "author.person": id } }] } },
    sort: [{ year: { order: "desc" } }],
  }
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  return { data: data?.hits?.hits, total: data?.hits?.total?.value } || {}
}


export async function searchPublications({ cursor, query, filters }: SearchArgs): Promise<SearchResponse<Publication>> {
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
  if (filters) body.query.bool.filter = filters
  if (cursor) body.search_after = cursor;
  if (!query) body.query = { function_score: { query: body.query, random_score: {} }}
  const res = await fetch(
    `${publicationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const nextCursor: string = data?.hits?.hits[data.hits.hits.length - 1]?.sort || ""
  const totalCount: number = data?.hits?.total?.value || 0;
  const publications: ElasticResult<Publication>[] = data?.hits?.hits || []
  return { data: publications, cursor: nextCursor as string, total: totalCount }
}

export async function getPublicationFilters(
  query: string,
  filters: Record<string, unknown>[] = []
  ): Promise<PublicationAggregations> {
  const body: any = {
    size: 0,
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
    aggs: {
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
      byFunder: {
        terms: {
          field: "projects.type.keyword",
        }
      }
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = filters
  }
  const res = await fetch(
    `${publicationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;
  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count * 100 / _100Year,
    }
  }) || [];
  const byType = data?.byPublicationType?.buckets?.map((element) => {
    if (!publicationTypeMapping[element?.key]) return null;
    return {
      value: element.key,
      label: publicationTypeMapping[element.key],
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const byFunder = data?.byFunder?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byAuthors = data?.byAuthors?.buckets?.map((element) => {
    return {
      value: element.key.split('###')?.[0],
      label: element.key.split('###')?.[1],
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const _100IsOa = data?.byIsOa?.buckets && Math.max(...data.byIsOa.buckets.map((el) => el.doc_count));
  const byIsOa = data?.byIsOa?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count * 100 / _100IsOa,
    }
  }
  ).filter(el => el) || [];
  return { byYear, byType, byAuthors, byFunder, byIsOa }
}

export async function getMorePublicationsLikeThis(id: string) {
  const body = JSON.stringify({
    _source: SEARCH_SOURCE,
    size: 3,
    query: {
      more_like_this: {
        fields: ["title.*", "summary.*", "authors.fullName", "domains.label.*"],
        like: [{ _id: id }],
        min_term_freq: 1,
        max_query_terms: 12,
      },
    }
  })
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body, headers: postHeaders })
  const data = await res.json();
  return data?.hits?.hits?.map(({ _source }) => _source) || []
}