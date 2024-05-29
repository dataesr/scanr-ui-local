import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"
import { useMemo } from "react"

export default function useTab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "authors"

  const handleTabChange = useCallback(
    (tab: string) => {
      searchParams.set("tab", tab)
      if (searchParams.get("clusters")) searchParams.set("clusters", "false")
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const values = useMemo(() => {
    return { currentTab, handleTabChange }
  }, [currentTab, handleTabChange])
  return values
}
