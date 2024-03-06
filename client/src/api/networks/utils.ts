// export const objectMerge = (obj1: object, obj2: object): object =>
//   Object.entries(obj2).reduce((acc, [key, value]) => ({ ...acc, [key]: (acc[key] || 0) + value }), { ...obj1 })

// export const objectSlice = (obj: object, n: number): object =>
//   Object.entries(obj)
//     .sort(({ 1: a }, { 1: b }) => b - a)
//     .slice(0, n)
//     .reduce((acc, [k, v]) => {
//       acc[k] = v
//       return acc
//     }, {})

export const arrayPush = (arr: Array<any>, elem: any): Array<any> => {
  if (!elem) return arr
  if (typeof elem === "object")
    if (Array.isArray(elem)) {
      arr.push(...elem)
    } else {
      arr.push(...Object.keys(elem))
    }
  else {
    arr.push(elem)
  }
  return arr
}

export const labelClean = (label: string): string => {
  const clean = label
    // .split(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/)
    .split(" ")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ")

  return clean
}
