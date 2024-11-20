import { useMemo, useCallback } from "react"
import { NetworkParameter, NetworkParameters } from "../../../types/network"
import { useSearchParams } from "react-router-dom"
import { getBooleanParam } from "../utils"
import { NETWORK_PARAMETERS } from "../../../api/networks/network/parameters"

export default function useParameters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleParametersChange = useCallback(
    (parameter: string, value: NetworkParameter) => {
      searchParams.set(parameter, String(value))
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const resetParameter = useCallback(
    (parameter: string) => {
      searchParams.delete(parameter)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const resetParameters = useCallback(() => {
    Object.keys(NETWORK_PARAMETERS).forEach((key) => searchParams.delete(key))
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams, NETWORK_PARAMETERS])

  const resetParametersExternal = useCallback(
    (externalSearchParams: URLSearchParams) => {
      Object.keys(NETWORK_PARAMETERS).forEach((key) => externalSearchParams.delete(key))
      return externalSearchParams
    },
    [NETWORK_PARAMETERS]
  )

  const parameters: NetworkParameters = {
    maxNodes: Number(searchParams.get("maxNodes") || Number(NETWORK_PARAMETERS.maxNodes.default)),
    maxComponents: Number(searchParams.get("maxComponents") || Number(NETWORK_PARAMETERS.maxComponents.default)),
    clusters: getBooleanParam(searchParams.get("clusters"), Boolean(NETWORK_PARAMETERS.clusters.default)),
    layout: searchParams.get("layout") || String(NETWORK_PARAMETERS.layout.default),
    filterNode: searchParams.get("filterNode") || String(NETWORK_PARAMETERS.filterNode.default),
  }

  const values = useMemo(() => {
    return {
      parameters,
      handleParametersChange,
      resetParameter,
      resetParameters,
      resetParametersExternal
    }
  }, [parameters, handleParametersChange, resetParameter, resetParameters, resetParametersExternal])

  return values
}
