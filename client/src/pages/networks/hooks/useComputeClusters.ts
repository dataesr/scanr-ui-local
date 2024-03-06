import { useState, useCallback } from "react"
import { useMemo } from "react"

export default function useComputeClusters(networkTabs: Array<string>) {
  const computeClustersDefault = useCallback(
    () => networkTabs.reduce((acc, label) => ({ ...acc, [label]: false }), {}),
    [networkTabs]
  )
  const [computeClustersTabs, setComputeClustersTabs] = useState(computeClustersDefault)

  const handleComputeClustersChange = useCallback(
    (label: string) => setComputeClustersTabs({ ...computeClustersTabs, [label]: !computeClustersTabs[label] }),
    [computeClustersTabs]
  )

  const resetComputeClusters = useCallback(() => setComputeClustersTabs(computeClustersDefault), [computeClustersDefault])

  const values = useMemo(() => {
    return { computeClustersTabs, handleComputeClustersChange, resetComputeClusters }
  }, [computeClustersTabs, handleComputeClustersChange, resetComputeClusters])
  return values
}
