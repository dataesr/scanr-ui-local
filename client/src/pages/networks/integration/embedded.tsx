import { NetworksIntegrationOptions } from "../../../types/network"
import { stringifySearchFiltersForURL } from "../../search/hooks/useUrl"

export type NetworksEmbeddedArgs = NetworksIntegrationOptions & {
  query: string
  tab: string
  width?: string | number
  height?: string | number
  clusters?: boolean
  filters?: any
}

export default function NetworksEmbedded(args: NetworksEmbeddedArgs) {
  const url = window.location.origin + "/networks/integration"

  const options = Object.entries(args)
    .filter(([key]) => !["query", "width", "height", "filters"].includes(key))
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  const filters = args?.filters ? `&filters=${stringifySearchFiltersForURL(args.filters)}` : ""

  const source = `${url}?q=${args.query}&${options}${filters}`

  return <iframe width={args?.width || "100%"} height={args?.height || "100%"} src={source} />
}
