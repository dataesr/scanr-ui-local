import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function PublicationAccessFilter() {
  const { currentFilters, handleFilterChange } = useUrl()

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        <FormattedMessage id="search.publications.filters.by-is-oa" />
      </Text>
      <Listbox
        className="no-shadow"
        selectionMode="multiple"
        label="Open access"
        defaultSelectedKeys={currentFilters.isOa?.values?.[0]?.value ? ["true"] : []}
        onSelectionChange={() => handleFilterChange({ field: 'isOa', value: true, filterType: "bool", label: "Open access seulement" })}
      >
        <ListboxItem
          key="true"
          description="Voir les publications en accès ouvert uniquement"
          startContent={<span style={{ backgroundColor: 'var(--background-contrast-green-emeraude)', color: 'var(--text-label-green-emeraude)' }} className="avatar fr-mr-2w fr-icon--md fr-icon-lock-unlock-line fr-text-label--green-emeraude" />}
        >
          Ouvert
        </ListboxItem>
      </Listbox >
    </>
  )
}