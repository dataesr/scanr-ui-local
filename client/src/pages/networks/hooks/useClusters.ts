import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"
import { useMemo } from "react"

export default function useClusters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const stringClusters = (clusters: boolean) => (clusters ? "true" : "false")
  const booleanClusters = (clusters: string) => (clusters === "true" ? true : false)

  const clusters = booleanClusters(searchParams.get("clusters") || "false")

  const handleClustersChange = useCallback(
    (clusters: boolean) => {
      searchParams.set("clusters", stringClusters(clusters))
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const disableClusters = useCallback(() => searchParams.delete("clusters"), [searchParams])

  const values = useMemo(() => {
    return { clusters, handleClustersChange, disableClusters }
  }, [clusters, handleClustersChange, disableClusters])
  return values
}
