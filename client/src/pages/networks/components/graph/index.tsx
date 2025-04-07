import { VOSviewerOnline } from "vosviewer-online"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import Error204 from "../errors/error204"
import { useNetworkContext } from "../../context"
import useOptions from "../../hooks/useOptions"
import NetworkSpinner from "../spinner"

export default function NetworkGraph() {
  const { currentModel, parameters } = useOptions()
  const { focusItem } = useNetworkContext()
  const { search, currentQuery, filters } = useSearchData(false)
  const { search: searchClusters } = useSearchData()
  const { locale: lang } = useDSFRConfig()
  const theme = document.documentElement.getAttribute("data-fr-theme")

  if (searchClusters.isFetching) parameters.clusters = false
  const data = parameters.clusters ? searchClusters?.data : search?.data

  if (search.isFetching) return <NetworkSpinner />
  if (!data?.network) return <Error204 />

  const key = JSON.stringify({ currentModel, currentQuery, filters, ...parameters, lang, theme, focusItem })
  const params = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: false,
    show_item: focusItem,
  }

  return <VOSviewerOnline key={key} data={data} parameters={params} />
}
