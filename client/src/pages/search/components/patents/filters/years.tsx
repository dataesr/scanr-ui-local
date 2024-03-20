import { Text } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import { RangeSlider } from "../../../../../components/year-range-sliders";
import useUrl from "../../../hooks/useUrl";
import { PatentAggregations } from "../../../../../types/patent";

const KEEP_PATENTS_AFTER = 2009;

export default function PatentYearFilter() {
  const { handleRangeFilterChange } = useUrl();
  const intl = useIntl();
  const { data = { byYear: [] } } = useAggregateData("filters");
  const { byYear } = data as PatentAggregations;


  const _byYear = byYear?.filter(
    (year) => parseInt(year.value, 10) > KEEP_PATENTS_AFTER
  );

  if (!_byYear.length) {
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
        aria-label="Années de première publication"
        minValue={_byYear[0].value}
        maxValue={_byYear[_byYear.length - 1].value}
        step={1}
        height="100px"
        data={_byYear.map((year) => year.count)}
        color="purple-glycine"
        defaultValue={[_byYear[0].value, _byYear[_byYear.length - 1].value]}
        onChangeEnd={(value) =>
          handleRangeFilterChange({
            field: "year",
            value: value,
          })
        }
        tooltipLabel={(value, year) => (
          <>
            {intl.formatMessage(
              { id: "search.filters.patents.by-year-tooltip" },
              { year }
            )}
            <br />
            {value}
          </>
        )}
      />
    </>
  );
}
