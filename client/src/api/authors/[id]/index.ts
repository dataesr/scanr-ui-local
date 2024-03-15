import { publicationsIndex, postHeaders, authorsIndex } from "../../../config/api"
import { Author, AuthorsPublications } from "../../../types/author"
import { fillWithMissingYears } from "../../utils/years"

const PUBLICATION_LIGHT_SOURCE = [
  "title.*", "authors.fullName", "authors.person",
  "authors.role", "source.*", "isOa", 'type', 'id', 'year',
]

const AUTHOR_SOURCE = [
  "_id", "id", "idref", "orcid", "fullName", 
  "externalIds", "awards", "recentAffiliations",
]

async function getAuthorsPublicationsById(id: string): Promise<AuthorsPublications> {
  const body = {
    _source: PUBLICATION_LIGHT_SOURCE,
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
    size: 2000,
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
          return {
            value: el.sourceTitle,
            label: el.sourceTitle,
            count: el.count + 1
          }
        }
        return el;
      })
    }
    return [...acc, { value: sourceTitle, label: sourceTitle, count: 1 }]
  }, []).sort((a, b) => b.count - a.count)
  const coAuthors = publications
    .flatMap((el) => el.authors || [])
    .filter(el => el.person)
    .reduce((acc, el) => {
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
    }, [])
    .sort((a, b) => b.count - a.count)
  const _100Year = aggregations?.byYear?.buckets && Math.max(...aggregations.byYear.buckets.map((el) => el.doc_count));
  const byYear = aggregations?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  const wikis = aggregations?.wikis?.wiki?.buckets?.map((element) => {
    return {
      value: element.key,
      count: element.doc_count,
      label: element.key,
    }
  }) || [];

  return { publications, publicationsCount, coAuthors, wikis, reviews, byYear }
}

export async function getAuthorById(id: string): Promise<Author> {
  const body: any = {
    _source: AUTHOR_SOURCE,
    query: { bool: { filter: [{term: { "id.keyword": id }}] } },
  }
  const authorQuery = fetch(
    `${authorsIndex}/_search`,
    {method: 'POST', body: JSON.stringify(body), headers: postHeaders}
  ).then(r => r.json())
  const publicationsQuery = getAuthorsPublicationsById(id)
  const [author, publications] = await Promise.all([authorQuery, publicationsQuery])
  const authorData = author?.hits?.hits?.[0]?._source || {}
  const _id = author?.hits?.hits?.[0]?._id
  if (!Object.keys(authorData).length) throw new Error('404');
  return { ...authorData, _id, publications }
}