import { Button, ButtonGroup } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import useOptions from "../../hooks/useOptions"
import useScreenSize from "../../../../hooks/useScreenSize"
import { NETWORK_SOURCES } from "../../config/sources"

export default function NavigateToSearch() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentSource } = useOptions()
  const { local_id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const navigateToNetwork = () => {
    const searchQuery = searchParams.get("q") ? `q=${searchParams.get("q")}` : ""
    const searchFilters = searchParams.get("filters") ? `filters=${searchParams.get("filters")}` : ""
    navigate(`/${local_id}/search/${currentSource}?${searchQuery}${searchQuery && searchFilters && "&"}${searchFilters}`)
  }

  return (
    <ButtonGroup size={["xs", "sm"].includes(screen) ? "sm" : "md"} className="fr-mb-3w fr-mr-1w">
      <Button
        size="md"
        variant="primary"
        icon={NETWORK_SOURCES.find(({ label }) => label === currentSource).icon}
        iconPosition="left"
        onClick={navigateToNetwork}
      >
        {screen === "xs"
          ? intl.formatMessage({ id: `networks.navigate-to-search.${currentSource}.short` })
          : intl.formatMessage({ id: `networks.navigate-to-search.${currentSource}` })}
      </Button>
    </ButtonGroup>
  )
}
