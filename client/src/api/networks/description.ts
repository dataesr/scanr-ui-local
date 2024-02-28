import { objectSlice } from "./utils"
import { graphGetConf } from "./conf"

const objectToDescription = (obj: object): string =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    return `${acc}${k} (${v})</br>`
  }, "")

export default function itemGetDescription(model: string, key: string, attr: any): string {
  const conf = graphGetConf(model)

  if (!conf) return ""

  const url = model === "domains" ? `${conf?.url}?q="${attr.label.replace(/ /g, "+")}"` : `${conf?.url}/${key}`
  const header = `<div class='description_label'><a class='description_url' href=${url} target='_blank'>{label}</a></div><div></div>`

  const description = conf?.aggregations?.reduce(
    (acc, { name }) =>
      attr?.[name]
        ? acc +
          `<div class='description_text'><span><b>Main ${name}:</b></br>${objectToDescription(
            objectSlice(attr[name], 5)
          )}</div>`
        : acc,
    ""
  )

  return header + description
}
