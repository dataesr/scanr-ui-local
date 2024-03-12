import { graphGetConf } from "./models"

export default function nodeGetUrl(model: string, key: string, attr: any): string {
  const modelUrl = graphGetConf(model)?.url
  if (!modelUrl) return ""

  const baseUrl = window.location.href.split("/networks")[0]
  const targetUrl = model === "domains" || model === "software" ? `?q="${attr.label.replace(/ /g, "+")}"` : `/${key}`

  return baseUrl + modelUrl + targetUrl
}
