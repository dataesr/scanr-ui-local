import { NetworkParameters } from "../../../types/network"

type PARAMETER = {
  default: number | boolean | string
  min?: number
  max?: number
}
export const NETWORK_PARAMETERS: Record<string, PARAMETER> = {
  maxNodes: {
    min: 1,
    max: 1000,
    default: 300,
  },
  maxComponents: {
    min: 1,
    max: 10,
    default: 5,
  },
  clusters: {
    default: false,
  },
  layout: {
    default: "forceatlas",
  },
  filterNode: {
    default: "",
  },
}

export const getParameters = (sentParameters: NetworkParameters) => {
  const parameters = {}
  Object.entries(NETWORK_PARAMETERS).forEach(([key, value]) => {
    if (sentParameters?.[key]) {
      parameters[key] = value?.min ? Math.min(value.max, Math.max(value.min, sentParameters[key])) : sentParameters[key]
    } else parameters[key] = value.default
  })
  return parameters as NetworkParameters
}
