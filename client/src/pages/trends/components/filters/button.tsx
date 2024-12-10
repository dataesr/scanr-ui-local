import { Badge, Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import useUrl from "../../../search/hooks/useUrl"
import { useIntl } from "react-intl"

export default function TrendsFiltersButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentFilters } = useUrl()

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="more-line"
      iconPosition="left"
      as="button"
      aria-controls="trends-options-filters-modal"
      data-fr-opened="false"
      variant={"tertiary"}
    >
      {["xs", "sm"].includes(screen) ? "" : intl.formatMessage({ id: "trends.filters.button.label" })}
      <Badge className="fr-ml-1w" size="md" color="blue-ecume">
        {`${Object.keys(currentFilters)?.length}`}
      </Badge>
    </Button>
  )
}
