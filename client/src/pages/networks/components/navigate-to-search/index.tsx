import { Button, ButtonGroup } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useNavigate, useSearchParams } from "react-router-dom"
import useOptions from "../../hooks/useOptions"
import useScreenSize from "../../../../hooks/useScreenSize"
import { NETWORK_SOURCES } from "../../config/sources"

export default function NavigateToSearch() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentSource } = useOptions()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const navigateToNetwork = () => {
    const searchQuery = searchParams.get("q") ? `q=${searchParams.get("q")}` : ""
    const searchFilters = searchParams.get("filters") ? `filters=${searchParams.get("filters")}` : ""
    navigate(`/search/${currentSource}?${searchQuery}&${searchFilters}`)
  }

  return (
    <ButtonGroup size={["xs", "sm"].includes(screen) ? "sm" : "md"} className="fr-mb-3w">
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
