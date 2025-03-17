import { Network } from "../../../types/network"
import { networkSearch } from "./search"

export async function getStructureNetworkById(id: string, source: string, model: string): Promise<Network> {
  const organizationFilter = { terms: { "affiliations.id.keyword": [id] } }
  const data = networkSearch({
    source: source,
    model: model,
    filters: [organizationFilter],
    lang: "fr",
    parameters: { maxNodes: 300, maxComponents: 5, clusters: false, filterNode: "", sample: false },
  })

  return data
}
