import { postHeaders } from "../config/api";
import { SearchArgs, SearchResponse, ElasticResult } from "../types/commons";

export type LocalisationAutocomplete = {
  autocompleted: string[];
}

const index = "https://cluster-production.elasticsearch.dataesr.ovh/scanr-localisations"

export async function autocompleteLocalisations({ query }: SearchArgs): Promise<Pick<SearchResponse<LocalisationAutocomplete>, "data">> {
  const body: any = {
    size: 7,
    query: {
      match: {
        autocompleted: query
      }
    }
  }
  const res = await fetch(
    `${index}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()

  const _data: ElasticResult<LocalisationAutocomplete>[] = data?.hits?.hits || []  

  
  
  return { data: _data}
}