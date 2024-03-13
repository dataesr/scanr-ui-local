import { useMemo } from "react"
import { Container, Spinner } from "@dataesr/dsfr-plus"
import { VOSviewerOnline } from "vosviewer-online"
import useSearchData from "../hooks/useSearchData"
import useSearchClusters from "../hooks/useSearchClusters"
import Error204 from "./error204"

export default function Graph({ currentTab, computeClusters }: { currentTab: string; computeClusters: boolean }) {
  const { search, currentQuery, filters } = useSearchData(currentTab)
  const { search: searchClusters } = useSearchClusters(currentTab, computeClusters)
  const keyClusters = searchClusters.isFetching ? false : computeClusters
  const vosviewer = keyClusters ? searchClusters?.data : search?.data
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, filters, keyClusters }),
    [currentTab, currentQuery, filters, keyClusters]
  )

  if (!currentQuery) return <></>

  if (search.isFetching)
    return (
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <Spinner />
      </Container>
    )

  if (!vosviewer?.network)
    return (
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <Error204 />
      </Container>
    )

  const theme = document.documentElement.getAttribute("data-fr-scheme")
  const parameters = {
    attraction: 1,
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: false,
  }

  return (
    <Container key={key} style={{ height: "500px" }}>
      <VOSviewerOnline data={vosviewer} parameters={parameters} />
    </Container>
  )
}
