import { Autocomplete, AutocompleteItem, DissmissibleTag, MenuButton, MenuItem, TagGroup, Text, useAutocompleteList } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useUrl from "../../../hooks/useUrl";
import { Fragment } from "react";
import { autocompleteAuthors } from "../../../../../api/authors/autocomplete";
import { LightAuthor } from "../../../../../types/author";

export default function PublicationAuthorFilter() {
  const { currentFilters, handleFilterChange, setOperator } = useUrl()

  const authorsAutocompletedList = useAutocompleteList<LightAuthor>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] };
      }
      const res = await autocompleteAuthors({ query: filterText })
      console.log(res);

      return { items: res.data?.map((author) => author._source) };
    }
  });

  const operator = currentFilters.find((el) => el.field === 'authors.fullName')?.operator || 'or'

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.publications.filters.by-author" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.publications.filters.by-author-description" />
          </Text>
        </div>
        <MenuButton
          label={(operator === "or") ? "Union" : "Intersection"}
          className="fr-ml-2w"
          placement="end"
          size="sm"
          aria-label="Options"
          variant="text"
          icon={(operator === "or") ? "union" : "intersect"}
          onAction={(key) => setOperator('authors.fullName', (key === 'and') ? 'and' : 'or')}
        >
          <MenuItem
            key="or"
            className="fr-py-1v fr-px-2w"
            description={
              <>
                Combiner les valeurs sélectionnées
                <br />
                avec l'opérateur 'OU'
              </>
            }
            startContent={<span className="fr-icon-union fr-mr-2w" />}
          >
            <span className="fr-text--sm">
              Union
            </span>
          </MenuItem>
          <MenuItem
            key="and"
            className="fr-py-1v fr-px-2w"
            description={
              <>
                Combiner les valeurs sélectionnées
                <br />
                avec l'opérateur 'ET'
              </>
            }
            startContent={<span className="fr-icon-intersect fr-mr-2w" />}
          >
            <span className="fr-text--sm">
              Intersection
            </span>
          </MenuItem>
        </MenuButton>
      </div>
      {currentFilters.find((el) => el.field === 'authors.fullName') ? (<Text bold size="sm" className="fr-mb-1v">
        Séléctionnées:
      </Text>) : null}
      <TagGroup>
        {currentFilters.find((el) => el.field === 'authors.fullName')?.value?.map((value) => (
          <DissmissibleTag
            key={value}
            className="fr-mr-1v"
            color="orange-terre-battue"
            onClick={(e) => {
              e.preventDefault();
              handleFilterChange('authors.fullName', value)
            }}
          >
            {value}
          </DissmissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des auteurs"
        items={authorsAutocompletedList.items}
        inputValue={authorsAutocompletedList.filterText}
        onInputChange={authorsAutocompletedList.setFilterText}
        loadingState={authorsAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          handleFilterChange('authors.fullName', item)
        }}
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-user-line" />}
            description={item.topDomains?.filter((el) => el.type === "wikidata")?.slice(0, 3)?.map((el, i) => (<Fragment key={i}>
              {(i > 0) ? ', ' : ''}
              <Text as="span" bold>#{el?.label.default}</Text>
            </Fragment>))}
            key={item.fullName}
          >
            {item.fullName}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  )
}