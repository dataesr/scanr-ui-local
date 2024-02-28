import { objectMerge } from "./utils"
import { graphGetAggs } from "./conf"

const bucketToObject = (bucket) =>
  bucket.reduce((acc, item) => {
    item.key.split("---").forEach((coitem) => {
      const label = coitem.split("###")[1] ?? coitem
      acc[label] = acc[label] ? acc[label] + item.doc_count : item.doc_count
    })
    return acc
  }, {})

export default function itemGetAggregations(model: string, item: any, attr = undefined): object {
  return graphGetAggs(model)?.reduce(
    (acc, { name }) => ({
      ...acc,
      ...(item?.[name]?.buckets?.length && {
        [name]: attr?.[name]
          ? objectMerge(attr[name], bucketToObject(item[name].buckets))
          : bucketToObject(item[name].buckets),
      }),
    }),
    {}
  )
}
