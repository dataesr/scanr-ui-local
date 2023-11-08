import { publicationsIndex, headers, postHeaders } from './config.js'

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


export async function getPublicationById(id) {
  const res = await fetch(`${publicationsIndex}/_search?q=id:"${id}"`, { headers })
  const data = await res.json()
  return { ...data?.hits?.hits?.[0]?._source, _id: data?.hits?.hits?.[0]._id } || {}
}

export async function getAuthorsPublicationsById(id) {
  const body = {
    _source: SEARCH_SOURCE,
    query: { bool: { filter: [{ terms: { "author.person": id } }] } },
    sort: [{ year: { order: "desc" } }],
  }
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  return { data: data?.hits?.hits, total: data?.hits?.total?.value } || {}
}

export async function searchPublications({ cursor, query, filters }) {
  const body = {
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
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const nextCursor = data?.hits?.hits[data.hits.hits.length - 1]?.sort
  return { data: data?.hits?.hits, cursor: nextCursor, total: data?.hits?.total?.value } || {}
}

export async function getPublicationFilters(query) {
  const body = JSON.stringify({
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
          field: "authors.person.keyword",
          size: 10,
        },
        aggs: {
          byFullName: {
            terms: {
              field: "authors.fullName.keyword",
              size: 1,
            }
          }
        }
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
  })
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body, headers: postHeaders })
  const data = await res.json()
  return data?.aggregations || {}
}

export async function getMorePublicationsLikeThis(_id) {
  const body = JSON.stringify({
    _source: SEARCH_SOURCE,
    query: {
      more_like_this: {
        fields: ["title.*", "summary.*", "authors.fullName", "domains.label.*"],
        like: [{ _id }],
        min_term_freq: 1,
        max_query_terms: 12,
      },
    }
  })
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body, headers: postHeaders })
  const data = await res.json();
  return data?.hits?.hits?.map(({ _source }) => _source) || []
}