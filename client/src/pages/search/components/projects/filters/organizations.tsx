import { Autocomplete, AutocompleteItem, DissmissibleTag, TagGroup, Text, useAutocompleteList, useDSFRConfig } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useUrl from "../../../hooks/useUrl";
import { autocompleteOrganizations } from "../../../../../api/organizations/autocomplete";
import { LightOrganization } from "../../../../../types/organization";
import OperatorButton from "../../../../../components/operator-button";
import getLangFieldValue from "../../../../../utils/lang";

export default function ProjectOrganizationsFilter() {
  const { locale } = useDSFRConfig();
  const { currentFilters, handleFilterChange, setOperator } = useUrl()

  const authorsAutocompletedList = useAutocompleteList<LightOrganization>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] };
      }
      const res = await autocompleteOrganizations({ query: filterText })
      console.log(res);

      return { items: res.data?.map((author) => author._source) };
    }
  });

  const operator = currentFilters.find((el) => el.field === 'participants.structure.id')?.operator || 'or'

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.projects.filters.by-author" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.projects.filters.by-author-description" />
          </Text>
        </div>
        <OperatorButton operator={operator} setOperator={(key) => setOperator('participants.structure.id', (key === 'and') ? 'and' : 'or')} />
      </div>
      {currentFilters.find((el) => el.field === 'participants.structure.id') ? (<Text bold size="sm" className="fr-mb-1v">
        Séléctionnées:
      </Text>) : null}
      <TagGroup>
        {currentFilters.find((el) => el.field === 'participants.structure.id')?.value?.map((value) => (
          <DissmissibleTag
            key={value}
            className="fr-mr-1v"
            color="orange-terre-battue"
            onClick={(e) => {
              e.preventDefault();
              handleFilterChange('participants.structure.id', value)
            }}
          >
            {value}
          </DissmissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des structures"
        items={authorsAutocompletedList.items}
        inputValue={authorsAutocompletedList.filterText}
        onInputChange={authorsAutocompletedList.setFilterText}
        loadingState={authorsAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          handleFilterChange('participants.structure.id', item)
        }}
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-user-line" />}
            description={item.address?.find((a) => a.main).city}
            key={item.id}
          >
            {getLangFieldValue(locale)(item.label)}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  )
}