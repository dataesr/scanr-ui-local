import { Network } from "../../../types/network"
import { networkSearch } from "./search"

export async function getStructureNetworkById(id: string, model: string): Promise<Network> {
  const organizationFilter = { terms: { "affiliations.id.keyword": [id] } }
  const data = networkSearch({ model: model, filters: [organizationFilter] })

  return data
}
