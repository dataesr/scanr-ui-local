import { Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import Histogram from "../../../../../components/YearRangeSlider/histogram";
import { ProjectAggregations } from "../../../../../types/project";
import useAggregateData from "../../../hooks/useAggregationData";

export default function ProjectYearFilter() {
  const { data = { byYear: [] } } = useAggregateData('filters')
  const { byYear } = data as ProjectAggregations

  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        <FormattedMessage id="search.projects.filters.by-year" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.projects.filters.by-year-description" />
      </Text>
      <Histogram height="75px" data={byYear.map((year) => year.count)} />
    </>
  )
}