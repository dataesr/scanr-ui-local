import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { getBooleanParam } from "../../networks/utils"

export default function useOptions() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentModel = searchParams.get("model") || "entity-fishing"
  const currentSource = searchParams.get("source") || "publications"
  const normalized = getBooleanParam(searchParams.get("normalized"), false)

  const handleModelChange = useCallback(
    (model: string) => {
      searchParams.set("model", model)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const handleSourceChange = useCallback(
    (source: string) => {
      searchParams.set("source", source)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const setNormalized = useCallback(
    (normalized: boolean) => {
      searchParams.set("normalized", normalized ? "true" : "false")
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const values = useMemo(() => {
    return { currentModel, handleModelChange, currentSource, handleSourceChange, normalized, setNormalized }
  }, [currentModel, handleModelChange, currentSource, handleSourceChange, normalized, setNormalized])
  return values
}
