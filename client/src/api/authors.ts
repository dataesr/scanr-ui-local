import { headers, postHeaders, publicationsIndex, authorsIndex } from './config';
import { Author, AuthorsAggregations } from './types/author';
import { ElasticResult, SearchArgs, SearchResponse } from './types/commons';

const SEARCH_FIELDS = [
  "fullName^3",
  "coContributors.fullName^1",
  "publications.title^2",
  "publications.summary.*^2",
  "domains.label.*^2"
]
const SEARCH_SOURCE = ["id", "fullName", "domains", "orcid"]
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
    "publications.title.default": {},
    "publications.summary.default": {},
    "domains.label.default": {},
  }
}
export async function getAuthorsPublicationsById(id: string): Promise<any> {
  const body = {
    _source: ["title.*", "authors.fullName", "authors.person", "authors.role", "source.*", "isOa", 'type', 'id', 'year'],
    query: { bool: { filter: [{ term: { "authors.person.keyword": id } }] } },
    sort: [{ year: { order: "desc" } }],
    aggs: {
      wikis: {
        filter: { term: { "domains.type.keyword": "wikidata" } },
        aggs: {
          wiki: {
            terms: {
              size: 30,
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
    },
    size: 1000,
  }
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const publications = data?.hits?.hits?.map(({ _source }) => _source) || []
  const aggregations = data?.aggregations || {}
  const publicationsCount = data?.hits?.total?.value || 0
  const reviews = publications.reduce((acc, el) => {
    const sourceTitle = el?.source?.title
    if (!sourceTitle) return acc;
    if (acc.find((el) => el.sourceTitle === sourceTitle)) {
      return acc.map((el) => {
        if (el.sourceTitle === sourceTitle) {
          return { ...el, count: el.count + 1 }
        }
        return el;
      })
    }
    return [...acc, { sourceTitle, count: 1 }]
  }, []).sort((a, b) => b.count - a.count)
  const coAuthors = publications.flatMap((el) => el.authors || []).filter(el => el.person).reduce((acc, el) => {
    const value = el.person;
    if (value === id) return acc;
    if (!value) return acc;
    if (acc.find((el) => el.value === value)) {
      return acc.map((el) => {
        if (el.value === value) {
          return { ...el, count: el.count + 1 }
        }
        return el;
      })
    }
    return [...acc, { value, label: el.fullName, count: 1 }]
  }, []).sort((a, b) => b.count - a.count)
  // const coAuthors = aggregations?.byAuthors?.buckets?.map((element) => {
  //   return {
  //     value: element.key,
  //     label: element.byFullName.buckets?.[0]?.key,
  //     count: element.doc_count,
  //   }
  // }).filter(el => el) || [];
  const _100Year = aggregations?.byYear?.buckets && Math.max(...aggregations.byYear.buckets.map((el) => el.doc_count));
  const byYear = aggregations?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count * 100 / _100Year,
    }
  }) || [];
  const wikis = aggregations?.wikis?.wiki?.buckets?.map((element) => {
    return {
      value: element.key,
      count: element.doc_count,
      label: element.key,
    }
  }) || [];

  return { publications, publicationsCount, coAuthors, wikis, reviews, byYear, aggregations } || {}
}

export async function getAuthorById(id) {
  const authorQuery = fetch(`${authorsIndex}/_search?q=id:"${id}"`, { headers }).then(r => r.json())
  const publicationsQuery = getAuthorsPublicationsById(id)
  const [author, publications] = await Promise.all([authorQuery, publicationsQuery])
  const authorData = author?.hits?.hits?.[0]?._source || {}
  return { ...authorData, ...publications }
}

export async function searchAuthors({ cursor, query, filters }: SearchArgs): Promise<SearchResponse<Author>> {
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
    `${authorsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const nextCursor: string = data?.hits?.hits[data.hits.hits.length - 1]?.sort || ""
  const totalCount: number = data?.hits?.total?.value || 0;
  const authors: ElasticResult<Author>[] = data?.hits?.hits || []
  
  return { data: authors, cursor: nextCursor as string, total: totalCount }
}

export async function getAuthorsFilters(
  query: string,
  filters: Record<string, unknown>[] = []
  ): Promise<AuthorsAggregations> {
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
      byAward: {
        terms: {
          field: "awards.label.keyword",
          size: 500,
        }
      },
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = filters
  }
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