import { Button, ButtonGroup } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useLocation, useNavigate } from "react-router-dom"
import useUrl from "../../hooks/useUrl"

export default function NavigateToNetwork() {
  const intl = useIntl()
  const { api } = useUrl()
  const location = useLocation()
  const navigate = useNavigate()

  const navigateToNetwork = () => {
    const search = location?.search ? `&${location.search.slice(1)}` : ""
    navigate(`/networks?source=${api}${search}`)
  }

  return (
    <ButtonGroup className="fr-mb-3w">
      <Button size="md" variant="primary" icon="network-line" iconPosition="left" onClick={navigateToNetwork}>
        {intl.formatMessage({ id: "search.navigate-to-network.label" })}
      </Button>
    </ButtonGroup>
  )
}
