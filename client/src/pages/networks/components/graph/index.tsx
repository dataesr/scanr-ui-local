import { useMemo } from "react"
import { Spinner } from "@dataesr/dsfr-plus"
import { VOSviewerOnline } from "vosviewer-online"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import Default from "./default"
import useTab from "../../hooks/useTab"
import useClusters from "../../hooks/useClusters"
import useSearchData from "../../hooks/useSearchData"
import Error204 from "../errors/error204"

export default function NetworkGraph() {
  const { currentTab } = useTab()
  const { clusters: computeClusters } = useClusters()
  const { search, currentQuery, filters } = useSearchData(currentTab, false)
  const { search: searchClusters } = useSearchData(currentTab, computeClusters)
  const { locale: lang } = useDSFRConfig()

  const focusItem = ""

  const keyClusters = searchClusters.isFetching ? false : computeClusters
  const vosviewer = keyClusters ? searchClusters?.data : search?.data
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, filters, keyClusters, lang, focusItem }),
    [currentTab, currentQuery, filters, keyClusters, lang, focusItem]
  )

  if (!currentQuery) return <Default />

  if (search.isFetching) return <Spinner />

  if (!vosviewer?.network) return <Error204 />

  const theme = document.documentElement.getAttribute("data-fr-scheme")
  const parameters = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: true,
    show_item: focusItem,
  }

  return <VOSviewerOnline key={key} data={vosviewer} parameters={parameters} />
}
