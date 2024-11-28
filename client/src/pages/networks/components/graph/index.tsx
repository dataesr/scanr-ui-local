import { Spinner } from "@dataesr/dsfr-plus"
import { VOSviewerOnline } from "vosviewer-online"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import Default from "./default"
import useTab from "../../hooks/useTab"
import useSearchData from "../../hooks/useSearchData"
import Error204 from "../errors/error204"
import useParameters from "../../hooks/useParameters"
import { useNetworkContext } from "../../context"

export default function NetworkGraph() {
  const { currentTab } = useTab()
  const { parameters } = useParameters()
  const { focusItem } = useNetworkContext()
  const { search, currentQuery, filters } = useSearchData(currentTab, false)
  const { search: searchClusters } = useSearchData(currentTab)
  const { locale: lang } = useDSFRConfig()
  const theme = document.documentElement.getAttribute("data-fr-theme")

  if (searchClusters.isFetching) parameters.clusters = false
  const vosviewer = parameters.clusters ? searchClusters?.data : search?.data

  if (!currentQuery) return <Default />

  if (search.isFetching) return <Spinner />

  if (!vosviewer?.network) return <Error204 />

  const key = JSON.stringify({ currentTab, currentQuery, filters, ...parameters, lang, theme, focusItem })
  console.log("key", key)

  const vosparams = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: true,
    show_item: focusItem,
  }

  return <VOSviewerOnline key={key} data={vosviewer} parameters={vosparams} />
}
