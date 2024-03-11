import { Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import { RangeSlider } from "../../../../../components/year-range-sliders";
import useUrl from "../../../hooks/useUrl";
import { PatentAggregations } from "../../../../../types/patent";

export default function PatentYearFilter() {
  const { handleFilterChange } = useUrl();
  const { data = { byYear: [] } } = useAggregateData("filters");
  const { byYear } = data as PatentAggregations;
  if (!byYear.length) {
    return null;
  }

  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        <FormattedMessage id="search.filters.patents.by-year" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.filters.patent.by-year-description" />
      </Text>
      <RangeSlider
        aria-label="Années de publication"
        minValue={byYear[0].value}
        maxValue={byYear[byYear.length - 1].value}
        step={1}
        data={byYear.map((year) => year.normalizedCount)}
        color="green-emeraude"
        defaultValue={[byYear[0].value, byYear[byYear.length - 1].value]}
        onChangeEnd={(value) =>
          handleFilterChange({
            field: "year",
            value: value,
            filterType: "range",
          })
        }
        tooltipLabel={undefined}
      />
    </>
  );
}
