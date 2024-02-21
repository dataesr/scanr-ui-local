import { Button, SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { OrganizationAggregations } from "../../../../../types/organization";
import { useState } from "react";

const SEE_MORE_AFTER = 8


export default function OrganizationLevelFilter() {
  const intl = useIntl();
  const { currentFilters, handleFilterChange } = useUrl()
  const { data = { byLevel: [] } } = useAggregateData('filters')
  const { byLevel } = data as OrganizationAggregations;

  const [seeMoreNature, setSeeMoreNature] = useState(false)

  return (
    <>
      <Text className="fr-mb-1v" bold size="md">
        <FormattedMessage id="search.organizations.filters.by-level" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.organizations.filters.by-level-description" />
      </Text>
      <TagGroup>
        {byLevel.slice(0, seeMoreNature ? 10000 : SEE_MORE_AFTER).map((element) => (
          <SelectableTag
            selected={currentFilters.level?.values?.map(v => v.value)?.includes(element.value)}
            key={element.value}
            color="yellow-tournesol"
            onClick={() => handleFilterChange({ field: 'level', value: element.value })}
          >
            {element.label}
          </SelectableTag>
        ))}
      </TagGroup>
      {seeMoreNature
        ? <Button variant="text" size="sm" onClick={() => setSeeMoreNature(false)}>{intl.formatMessage({ id: "search.filters.see-less" })}</Button>
        : <Button variant="text" size="sm" onClick={() => setSeeMoreNature(true)}>{intl.formatMessage({ id: "search.filters.see-more" })}</Button>}
    </>
  )
}