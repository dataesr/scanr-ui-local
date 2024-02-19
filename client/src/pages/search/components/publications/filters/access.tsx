import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function PublicationAccessFilter() {
  const { currentFilters, handleFilterChange } = useUrl()

  // const isOa = currentFilters.find((el) => el.field === 'isOa').value === "true"
  //   ? "true"
  //   : currentFilters.find((el) => el.field === 'isOa').value === "false"
  //     ? "false" : 'none';

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        <FormattedMessage id="search.publications.filters.by-is-oa" />
      </Text>
      <Listbox
        className="no-shadow"
        selectionMode="multiple"
        label="Open access"
        defaultSelectedKeys={currentFilters.find((el) => el.field === 'isOa') ? ["true"] : []}
        onSelectionChange={() => handleFilterChange('isOa', true, "bool")}
      >
        <ListboxItem
          key="true"
          description="Voir les publications en accès ouvert uniquement"
          startContent={<span style={{ backgroundColor: 'var(--background-contrast-green-emeraude)', color: 'var(--text-label-green-emeraude)' }} className="avatar fr-mr-2w fr-icon--md fr-icon-lock-unlock-line fr-text-label--green-emeraude" />}
        >
          Ouvert
        </ListboxItem>
        {/* <ListboxItem
          key="false"
          description="Voir les publications en accès fermé"
        >
          Fermé
        </ListboxItem> */}
      </Listbox >
    </>
  )
}