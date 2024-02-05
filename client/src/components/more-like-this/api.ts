import { organizationsIndex, postHeaders, publicationsIndex } from "../../config/api";

const PUBLICATIONS_SOURCE = ["title.*", "authors.fullName", "authors.person", "source.*", "isOa", 'type', 'id', "year"]
const ORGANIZATIONS_SOURCE = ["label.*", "acronym.*", "address.main", "address.city", "kind", "level", 'nature', 'id', "creationYear", "isFrench", "active"]



export async function getMorePublicationsLikeThis(id: string) {
  const body = JSON.stringify({
    _source: PUBLICATIONS_SOURCE,
    size: 3,
    query: {
      more_like_this: {
        fields: ["title.default"],
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

export async function getMoreOrganizationsLikeThis(id: string) {
  const body = JSON.stringify({
    _source: ORGANIZATIONS_SOURCE,
    size: 3,
    query: {
      bool: {
        filter: { term: { status: "active" } },
        must: [{
          more_like_this: {
            fields: ["publications.title.*"],
            like: [{ _id: id }],
            min_term_freq: 1,
            max_query_terms: 12,
          },
        }]
      }
    }
  })
  const res = await fetch(`${organizationsIndex}/_search`, { method: 'POST', body, headers: postHeaders })
  const data = await res.json();
  return data?.hits?.hits?.map(({ _source }) => _source) || []
}