import { Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import Histogram from "../../../../../components/YearRangeSlider/histogram";
import { PublicationAggregations } from "../../../../../types/publication";
import useAggregateData from "../../../hooks/useAggregationData";

export default function PublicationYearFilter() {
  const { data = { byYear: [] } } = useAggregateData('filters')
  const { byYear } = data as PublicationAggregations

  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        <FormattedMessage id="search.publications.filters.by-year" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.publications.filters.by-year-description" />
      </Text>
      <Histogram height="75px" data={byYear.map((year) => year.count)} />
    </>
  )
}