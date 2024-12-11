import { Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { PublicationAggregations } from "../../../../../types/publication"
import { RangeSlider } from "../../../../../components/year-range-sliders"
import useUrl from "../../../../search/hooks/useUrl"
import useAggregateData from "../../../../search/hooks/useAggregationData"
import { MAX_YEAR, MIN_YEAR } from "../../../config/years"

export default function PublicationYearFilter() {
  const intl = useIntl()
  const { handleRangeFilterChange, currentFilters } = useUrl()
  const { data = { byYear: [] } } = useAggregateData("filters")
  const { byYear = [] } = data as PublicationAggregations

  if (!byYear.length) return null

  const defaultValues = [
    Math.max(MIN_YEAR, Number(byYear[0].value)),
    Math.min(MAX_YEAR, Number(byYear[byYear.length - 1].value)),
  ]

  console.log("currentFilters", currentFilters)

  const min = Number(currentFilters?.year?.values?.[0]?.value || defaultValues[0])
  const max = Number(currentFilters?.year?.values?.[1]?.value || defaultValues[1])

  const byYearFiltered = byYear.filter(
    (year) => Number(year.value) >= defaultValues[0] && Number(year.value) <= defaultValues[1]
  )

  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        {intl.formatMessage({ id: "search.filters.publications.by-year" })}
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        {intl.formatMessage({ id: "search.filters.publications.by-year-description" }, { min, max })}
      </Text>

      <RangeSlider
        aria-label="Années de publication"
        minValue={defaultValues[0]}
        maxValue={defaultValues[1]}
        step={1}
        height="100px"
        data={byYearFiltered.map((year) => year.count)}
        color="purple-glycine"
        defaultValue={defaultValues}
        onChangeEnd={(value) => handleRangeFilterChange({ field: "year", value: value })}
        tooltipLabel={(value, year) => (
          <>
            {intl.formatMessage({ id: "search.filters.publications.by-year-tooltip" }, { year })}
            <br />
            {value}
          </>
        )}
      />
    </>
  )
}
