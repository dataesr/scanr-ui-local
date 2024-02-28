// import { objectMerge } from "./utils"
// import { graphGetAggs } from "./models"
import { ElasticDomains, ElasticHit, NetworkHit } from "../../types/network"
import { labelClean } from "./utils"

// const bucketToObject = (bucket) =>
//   bucket.reduce((acc, item) => {
//     item.key.split("---").forEach((coitem) => {
//       const label = coitem.split("###")[1] ?? coitem
//       acc[label] = acc[label] ? acc[label] + item.doc_count : item.doc_count
//     })
//     return acc
//   }, {})

const aggExtractDomains = (domains: ElasticDomains): any =>
  domains?.reduce((acc, { label, count }) => {
    if (label?.default) {
      const clean = labelClean(label.default)
      acc[clean] = acc[clean] ? acc[clean] + count : count
    }
    return acc
  }, {})

export const aggExtractHit = (hit: ElasticHit): NetworkHit => ({
  id: hit?.id,
  title: hit?.title?.default,
  type: hit?.productionType,
  isOa: hit?.isOa,
  domains: aggExtractDomains(hit?.domains) ?? {},
})

// export default function itemGetAggregations(model: string, item: any, attr = undefined): object {
//   return graphGetAggs(model)?.reduce(
//     (acc, { name }) => ({
//       ...acc,
//       ...(item?.[name]?.buckets?.length && {
//         [name]: attr?.[name]
//           ? objectMerge(attr[name], bucketToObject(item[name].buckets))
//           : bucketToObject(item[name].buckets),
//       }),
//     }),
//     {}
//   )
// }
