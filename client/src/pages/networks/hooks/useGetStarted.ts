import { useCallback, useMemo } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

export default function useGetStarted() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { page: currentPage } = useParams()
  const navigate = useNavigate()

  const nextPage = parseInt(currentPage) + 1

  const nextPageParams = (search: Record<string, string>) => {
    if (search) {
      Object.entries(search)?.forEach(([key, value]) => searchParams.set(key, value))
      setSearchParams(searchParams)
    }
    return searchParams.size ? `?${searchParams.toString()}` : ""
  }

  const navigateToNextPage = useCallback(
    (search?: Record<string, string>) => {
      navigate(`/networks/get-started/${nextPage}${nextPageParams(search)}`)
    },
    [nextPage]
  )
  const navigateToNetwork = useCallback(
    (search?: Record<string, string>) => navigate(`/networks${nextPageParams(search)}`),
    []
  )

  const values = useMemo(() => {
    return { navigateToNextPage, navigateToNetwork }
  }, [navigateToNextPage, navigateToNetwork])

  return values
}
