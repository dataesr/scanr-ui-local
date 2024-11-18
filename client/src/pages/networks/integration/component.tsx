import { NetworksIntegrationOptions } from "../../../types/network"

export type NetworksEmbeddedArgs = NetworksIntegrationOptions & {
  query: string
  width?: string | number
  height?: string | number
}

export default function NetworksEmbedded(args: NetworksEmbeddedArgs) {
  const url = window.location.origin + "/networks/integration"

  const options = Object.entries(args)
    .filter(([key]) => !["query", "width", "height"].includes(key))
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  const source = `${url}?q=${args.query}${options ? "&" + options : ""}`

  return <iframe width={args?.width || "100%"} height={args?.height || "100%"} src={source} />
}
