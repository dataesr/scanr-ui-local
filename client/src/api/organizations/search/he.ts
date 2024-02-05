import { organizationsIndex, postHeaders } from '../../../config/api'
import { ElasticResult, SearchArgs, SearchResponse } from '../../../types/commons'
import { LightOrganization } from '../../../types/organization'
import { HIGHLIGHT, LIGHT_SOURCE, SORTER } from '../_utils/constants'

const FIELDS = [
  'publications.title.default',
  'publications.keywords.default',
  'projects.label.en',
  'projects.label.default',
  // TODO: Add websites.text.default
]
const getMatchPhrases = (kwords) => kwords.reduce((acc, keyword) => ([
  ...acc, 
  ...FIELDS.map((field) => ({ match_phrase: { [field]: keyword } }))
]), []);

export async function searchOrganizationsForHe({ cursor, query, filters }: SearchArgs): Promise<SearchResponse<LightOrganization>> {
  const body: any = {
    _source: LIGHT_SOURCE,
    sort: SORTER,
    highlight: HIGHLIGHT,
    query: {
      bool: {
        minimum_should_match: 1,
        should: getMatchPhrases(query?.split('|')),
        filter: [...filters || [], { term: { status: "active" } }]
      }
    },
  }
  if (cursor) body.search_after = cursor;
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const nextCursor: string = json?.hits?.hits[json.hits.hits.length - 1]?.sort || ""
  const totalCount: number = json?.hits?.total?.value || 0;
  const data: ElasticResult<LightOrganization>[] = json?.hits?.hits || []
  return { data, cursor: nextCursor as string, total: totalCount }
}