import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function useTab() {
  const [searchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "authors"

  const values = useMemo(() => currentTab, [currentTab])
  return values
}
