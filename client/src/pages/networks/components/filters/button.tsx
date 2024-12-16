import { Badge, Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import useUrl from "../../../search/hooks/useUrl"
import useIntegration from "../../hooks/useIntegration"

export default function NetworkFiltersButton() {
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const { currentFilters } = useUrl()

  if (integrationOptions.showFilters === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="more-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-filters-modal"
      data-fr-opened="false"
      variant={"tertiary"}
    >
      {["xs", "sm", "mg"].includes(screen) ? "" : "Filtres"}
      <Badge className="fr-ml-1w" size="md" color="blue-ecume">
        {`${Object.keys(currentFilters)?.length}`}
      </Badge>
    </Button>
  )
}
