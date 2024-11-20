import { useMemo, useCallback } from "react"
import { NetworkParameter, NetworkParameters } from "../../../types/network"
import { useSearchParams } from "react-router-dom"

const DEFAULT_OPTIONS = {
  maxNodes: 300,
  maxComponents: 5,
  enableClusters: true,
  filterNode: "",
}

export default function useParameters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleParametersChange = useCallback(
    (parameter: string, value: NetworkParameter) => {
      searchParams.set(parameter, String(value))
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const resetParameters = useCallback(() => {
    Object.keys(DEFAULT_OPTIONS).forEach((key) => searchParams.delete(key))
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  const parameters: NetworkParameters = {
    maxNodes: Number(searchParams.get("maxNodes") || DEFAULT_OPTIONS.maxNodes),
    maxComponents: Number(searchParams.get("maxComponents") || DEFAULT_OPTIONS.maxComponents),
    enableClusters: DEFAULT_OPTIONS.enableClusters,
    filterNode: DEFAULT_OPTIONS.filterNode,
  }

  const values = useMemo(() => {
    return {
      parameters,
      handleParametersChange,
      resetParameters,
    }
  }, [parameters, handleParametersChange, resetParameters])

  return values
}
