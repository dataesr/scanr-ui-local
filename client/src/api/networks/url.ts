import { graphGetConf } from "./models"

export default function nodeGetUrl(model: string, key: string, attr: any): string {
  const conf = graphGetConf(model)

  if (!conf) return ""

  const url =
    model === "domains" || model === "software" ? `${conf?.url}?q="${attr.label.replace(/ /g, "+")}"` : `${conf?.url}/${key}`

  return url
}
