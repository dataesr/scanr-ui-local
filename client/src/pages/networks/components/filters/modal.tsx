import useOptions from "../../hooks/useOptions"
import NetworkFiltersPatentsModal from "./patents"
import NetworkFiltersPublicationsModal from "./publications"

const SOURCES_MAPPING = {
  publications: <NetworkFiltersPublicationsModal />,
  patents: <NetworkFiltersPatentsModal />,
}

export default function NetworkFiltersModal() {
  const { currentSource } = useOptions()

  return SOURCES_MAPPING[currentSource]
}
