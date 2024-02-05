import { publicationsIndex, postHeaders } from "../../../config/api"
import { Publication } from "../../../types/publication"

export async function getPublicationById(id: string): Promise<Publication> {
  
  const body: any = {
    _source: [
      "title", "summary", "authors.fullName", "authors.person", "authors.role", "authors.affiliations",
      "domains", "affiliations", "source", "isOa", 'type', 'id', "year", "oaEvidence", "projects"
    ],
    query: {
      bool: {
        filter: [{term: { "id.keyword": id }}]
      }
    },
  }
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const publication = data?.hits?.hits?.[0]?._source
  if (!publication) throw new Error('404')
  return { ...publication, _id: data?.hits?.hits?.[0]._id }
}