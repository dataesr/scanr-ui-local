import { useState, useCallback } from "react"
import { useMemo } from "react"

export default function useClusters(networkTabs: Array<string>) {
  const clustersDefault = useCallback(
    () => networkTabs.reduce((acc, label) => ({ ...acc, [label]: false }), {}),
    [networkTabs]
  )
  const [clustersTabs, setClustersTabs] = useState(clustersDefault)

  const handleClustersChange = useCallback(
    (label: string) => setClustersTabs({ ...clustersTabs, [label]: !clustersTabs[label] }),
    [clustersTabs]
  )

  const resetClusters = useCallback(() => setClustersTabs(clustersDefault), [clustersDefault])

  const values = useMemo(() => {
    return { clustersTabs, handleClustersChange, resetClusters }
  }, [clustersTabs, handleClustersChange, resetClusters])
  return values
}
