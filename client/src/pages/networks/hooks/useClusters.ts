import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"
import { useMemo } from "react"

export default function useClusters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clusters = searchParams.get("clusters") === "true" ? true : false

  const handleClustersChange = useCallback(
    (clusters: boolean) => {
      searchParams.set("clusters", clusters === true ? "true" : "false")
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const disableClusters = useCallback(() => {
    searchParams.delete("clusters")
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  const values = useMemo(() => {
    return { clusters, handleClustersChange, disableClusters }
  }, [clusters, handleClustersChange, disableClusters])
  return values
}
