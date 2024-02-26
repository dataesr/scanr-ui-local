import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { OrganizationAggregations } from "../../../../../types/organization";
import OperatorButton from "../../../../../components/operator-button";

export default function OrganizationTagsFilter() {
  const { currentFilters, handleFilterChange, setOperator } = useUrl()
  const { data = { byTags: [] } } = useAggregateData('filters')
  const { byTags } = data as OrganizationAggregations

  const filter = currentFilters?.['badges.label.fr']
  const operator = filter?.operator || 'or'

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.organizations.filters.by-project" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.organizations.filters.by-project-description" />
          </Text>
        </div>
        <OperatorButton operator={operator} setOperator={(key) => setOperator('badges.label.fr', (key === 'and') ? 'and' : 'or')} />
      </div>
      <TagGroup>
        {byTags.map((funder) => (
          <SelectableTag
            selected={currentFilters?.['badges.label.fr']?.values.map(v => v.value)?.includes(funder.value)}
            key={funder.value}
            color="pink-macaron"
            onClick={() => handleFilterChange({ field: 'badges.label.fr', value: funder.value })}
          >
            {funder.label}
          </SelectableTag>
        ))}
      </TagGroup>
    </>
  )
}