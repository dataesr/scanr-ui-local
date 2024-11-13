import { countriesIndex, postHeaders } from "../config/api"
import { SearchArgs, SearchResponse, ElasticResult } from "../types/commons"

export type CountriesAutocomplete = {
  autocompleted: string[]
}

export async function autocompleteCountries({
  query,
}: SearchArgs): Promise<Pick<SearchResponse<CountriesAutocomplete>, "data">> {
  const body: any = {
    size: 7,
    query: {
      match: {
        autocompleted: query,
      },
    },
  }
  const res = await fetch(`${countriesIndex}/_search`, { method: "POST", body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const countries: ElasticResult<CountriesAutocomplete>[] = data?.hits?.hits || []

  return { data: countries }
}
