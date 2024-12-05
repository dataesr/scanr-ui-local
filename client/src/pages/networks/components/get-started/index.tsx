import { useNetworkContext } from "../../context"

function NetworkGetStartedSearchBar() {
  return null
}

export default function NetworkGetStarted() {
  const { getStartedPage, setGetStartedPage } = useNetworkContext()

  if (getStartedPage === 1) return <NetworkGetStartedSearchBar />

  return null
}
