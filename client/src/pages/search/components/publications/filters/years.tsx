import { Text } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import { PublicationAggregations } from "../../../../../types/publication";
import useAggregateData from "../../../hooks/useAggregationData";
import { RangeSlider } from "../../../../../components/year-range-sliders";
import useUrl from "../../../hooks/useUrl";

export default function PublicationYearFilter() {
  const intl = useIntl();
  const { handleFilterChange, currentFilters } = useUrl();
  const { data = { byYear: [] } } = useAggregateData('filters')
  const { byYear = [] } = data as PublicationAggregations

  if (!byYear.length) {
    return null
  }

  const min = currentFilters?.year?.values?.[0]?.value || byYear[0].value;
  const max = currentFilters?.year?.values?.[1]?.value || byYear[byYear.length - 1].value;

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
        minValue={byYear[0].value}
        maxValue={byYear[byYear.length - 1].value}
        step={1}
        data={byYear.map((year) => year.count)}
        color="purple-glycine"
        defaultValue={[byYear[0].value, byYear[byYear.length - 1].value]}
        onChangeEnd={(value) => handleFilterChange({ field: 'year', value: value, filterType: 'range' })}
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