import { projectsIndex, headers, postHeaders } from './config'
import { ElasticResult, SearchArgs, SearchResponse } from './types/commons'
import { Project, ProjectAggregations } from './types/project'

const SEARCH_SOURCE = ["label.*","publications", "participants.structure.id", "participants.structure.label.*", "year", 'type', 'id', "keywords.*"]
// const SEARCH_FIELDS = ["title.*^3", "authors.fullName^3", "summary.*^2", "domains.label.*^2"]
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
    "title.default": {},
    "summary.default": {},
    "domains.label.default": {},
  }
}


export async function searchProjects({ cursor, query, filters }: SearchArgs): Promise<SearchResponse<Project>> {
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
              // fields: SEARCH_FIELDS,
            },
          }
        ]
      }
    },
  }
  if (filters) body.query.bool.filter = filters
  if (cursor) body.search_after = cursor;
  if (!query) body.query = { function_score: { query: body.query, random_score: {} }}

  // USING FUNCTION SCORE TO BOOST PROJECTS WITH MORE PARTICIPANTS
  // body.query = { function_score: { 
  //   query: body.query,
  //   functions: [
  //     {
  //       filter: { range: { participantCount: { gt: 20 } } },
  //       random_score: {},
  //       weight: 1.3
  //     },
  //     {
  //       filter: { range: { participantCount: { gt: 10 } } },
  //       random_score: {},
  //       weight: 1.2
  //     },
  //     {
  //       filter: { range: { participantCount: { gt: 5 } } },
  //       random_score: {},
  //       weight: 1.1
  //     }
  //   ],
  //   score_mode: 'first',
  //   boost_mode: 'multiply'
  // }}

  const res = await fetch(
    `${projectsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const json = await res.json()
  const nextCursor: string = json?.hits?.hits[json.hits.hits.length - 1]?.sort || ""
  const totalCount: number = json?.hits?.total?.value || 0;
  const data: ElasticResult<Project>[] = json?.hits?.hits || []
  return { data, cursor: nextCursor as string, total: totalCount }
}

export async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`${projectsIndex}/_search?q=id:"${id}"`, { headers })
  const data = await res.json()
  return { ...data?.hits?.hits?.[0]?._source, _id: data?.hits?.hits?.[0]._id } || {}
}


export async function getProjectFilters(
  query: string,
  filters: Record<string, unknown>[] = []
  ): Promise<ProjectAggregations> {
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
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = filters
  }
  const res = await fetch(
    `${projectsIndex}/_search`,
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
  const byType = data?.byType?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  return { byYear, byType }
}