export const getBooleanParam = (param: string, defaultValue = true) =>
  param ? (param.toLowerCase() === "true" ? true : false) : defaultValue