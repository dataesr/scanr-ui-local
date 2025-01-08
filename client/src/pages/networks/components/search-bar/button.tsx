import { Button } from "@dataesr/dsfr-plus"
import useUrl from "../../../search/hooks/useUrl"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function NetworkSearchBarButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const { currentQuery } = useUrl()
  const isEmptyQuery = !currentQuery || currentQuery === "*"
  const shortQuery = (currentQuery?.length || 0) > 20 ? currentQuery.slice(0, 17) + "..." : currentQuery

  if (integrationOptions.showSearchBar === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="search-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-search-bar-modal"
      data-fr-opened="false"
      variant={isEmptyQuery ? "tertiary" : "secondary"}
    >
      {["xs"].includes(screen)
        ? null
        : isEmptyQuery
        ? intl.formatMessage({ id: "networks.search-bar.button.label.anything" })
        : shortQuery}
    </Button>
  )
}
