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
