import { Button } from "@dataesr/dsfr-plus"
import useUrl from "../../../search/hooks/useUrl"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"

export default function TrendsSearchBarButton() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()
  const { currentQuery } = useUrl()

  if (integrationOptions.showSearchBar === false) return null

  const isEmptyQuery = !currentQuery || currentQuery === "*"
  const shortQuery = (currentQuery?.length || 0) > 20 ? currentQuery.slice(0, 17) + "..." : currentQuery

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="search-line"
      iconPosition="left"
      as="button"
      aria-controls="trends-options-search-bar-modal"
      data-fr-opened="false"
      variant={isEmptyQuery ? "tertiary" : "secondary"}
    >
      {isEmptyQuery ? intl.formatMessage({ id: "trends.search-bar.button.label.anything" }) : shortQuery}
    </Button>
  )
}
