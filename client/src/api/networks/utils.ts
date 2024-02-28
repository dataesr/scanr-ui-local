export const objectMerge = (obj1: object, obj2: object): object =>
  Object.entries(obj2).reduce((acc, [key, value]) => ({ ...acc, [key]: (acc[key] || 0) + value }), { ...obj1 })

export const objectSlice = (obj: object, n: number): object =>
  Object.entries(obj)
    .sort(({ 1: a }, { 1: b }) => b - a)
    .slice(0, n)
    .reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})
