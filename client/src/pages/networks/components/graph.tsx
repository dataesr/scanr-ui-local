import { useMemo } from "react"
import { Container, Spinner } from "@dataesr/dsfr-plus"
import { VOSviewerOnline } from "vosviewer-online"
import useSearchData from "../hooks/useSearchData"
import Error204 from "./error204"

export default function Graph({ currentTab, computeClusters }: { currentTab: string; computeClusters: boolean }) {
  const { search, currentQuery, currentFilters } = useSearchData(currentTab, computeClusters)
  const vosviewer = search?.data
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, currentFilters, computeClusters }),
    [currentTab, currentQuery, currentFilters, computeClusters]
  )

  if (currentQuery === null) return <></>

  if (search.isFetching)
    return (
      <Container
        className="fr-mt-5w"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}
      >
        <Spinner />
      </Container>
    )

  if (!vosviewer?.network)
    return (
      <Container
        className="fr-mt-5w"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}
      >
        <Error204 />
      </Container>
    )

  const theme = document.documentElement.getAttribute("data-fr-scheme")
  const parameters = {
    attraction: 1,
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: false,
    show_info: true,
  }

  return (
    <Container key={key} className="fr-mt-5w" style={{ height: "500px" }}>
      <VOSviewerOnline data={vosviewer} parameters={parameters} />
    </Container>
  )
}
