import useOptions from "../../hooks/useOptions"
import NetworkFiltersPatentsModal from "./patents"
import NetworkFiltersProjectsModal from "./projects"
import NetworkFiltersPublicationsModal from "./publications"

const SOURCES_MAPPING = {
  publications: <NetworkFiltersPublicationsModal />,
  patents: <NetworkFiltersPatentsModal />,
  projects: <NetworkFiltersProjectsModal />,
}

export default function NetworkFiltersModal() {
  const { currentSource } = useOptions()

  return SOURCES_MAPPING[currentSource]
}
