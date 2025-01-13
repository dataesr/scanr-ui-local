import { useCallback, useMemo } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export default function useGetStarted() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isGetStartedPage = pathname.split("/").includes("get-started")

  const currentPage = searchParams.get("page") || "0"
  const nextPage = parseInt(currentPage) + 1

  const handlePageChange = useCallback(
    (search?: Record<string, string>) => {
      if (isGetStartedPage) {
        if (search) Object.entries(search)?.forEach(([key, value]) => searchParams.set(key, value))
        searchParams.set("page", nextPage.toFixed(0))
        setSearchParams(searchParams)
      }
    },
    [nextPage, searchParams, setSearchParams]
  )

  const navigateToNetwork = useCallback(
    (search?: Record<string, string>) => {
      if (search) Object.entries(search)?.forEach(([key, value]) => searchParams.set(key, value))
      searchParams.delete("page")
      const searchParamsUrl = searchParams.size ? `?${searchParams.toString()}` : ""
      navigate(`/networks${searchParamsUrl}`, { preventScrollReset: true })
    },
    [searchParams]
  )

  const values = useMemo(() => {
    return { currentPage, handlePageChange, navigateToNetwork }
  }, [currentPage, handlePageChange, navigateToNetwork])

  return values
}
