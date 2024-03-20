import { Text, Toggle } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function PublicationAccessFilter() {
  const intl = useIntl();
  const { currentFilters, handleBoolFilterChange } = useUrl()

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        {intl.formatMessage({ id: "search.filters.publications.by-is-oa" })}
      </Text>
      <Toggle
        className="fr-mb-2w"
        label={intl.formatMessage({ id: "search.filters.publications.by-is-oa-label" })}
        checked={!!currentFilters.isOa?.values?.[0]?.value}
        onChange={(e) => handleBoolFilterChange(
          { field: 'isOa', value: e.target.checked, label: "Open access seulement" })
        }
      />
    </>
  )
}