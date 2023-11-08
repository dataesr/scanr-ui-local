import { headers, postHeaders, publicationsIndex, authorsIndex } from './config';

const SEARCH_FIELDS = ["title.*^3", "authors.fullName^3", "summary.*^2", "domains.label.*^2"]

export async function getAuthorsPublicationsById(id) {
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
              size: 20,
              field: "domains.label.default.keyword",
            }
          }
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
  const wikis = aggregations?.wikis?.wiki?.buckets?.map((element) => {
    return {
      value: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  return { publications, publicationsCount, coAuthors, wikis, reviews, aggregations } || {}
}

export async function getAuthorById(id) {
  const authorQuery = fetch(`${authorsIndex}/_search?q=id:"${id}"`, { headers }).then(r => r.json())
  const publicationsQuery = getAuthorsPublicationsById(id)
  const [author, publications] = await Promise.all([authorQuery, publicationsQuery])
  const authorData = author?.hits?.hits?.[0]?._source || {}
  return { ...authorData, ...publications }
}

export async function searchAuthors({ cursor, query, filters }) {
  const body = {
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
      authors: {
        terms: {
          field: "authors.person.keyword",
          size: 1000,
        }
      }
    }
  }
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders });
  const json = await res.json();
  console.log(json);
  return json;
}