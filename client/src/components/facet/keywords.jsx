import { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, TextInput } from "@dataesr/react-dsfr";

export function KeywordFacet({ data, label, value = [], onChange, isSearchable = false }) {
  const [selected, setSelected] = useState(value);
  const [search, setSearch] = useState('');

  const filteredData = search
    ? data.filter((element) => element.label.toLowerCase().includes(search.toLowerCase()))
    : data;

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <div className="facet">
      {isSearchable && (
        <TextInput
          type="search"
          placeholder="Rechercher"
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <CheckboxGroup legend={label}>
        {filteredData.sort((a, b) => b.count - a.count).map((element) => (
          <Checkbox
            size="sm"
            defaultChecked={selected.includes(element.value)}
            key={element.value}
            value={element.value}
            label={`${element.label} (${element.count})`}
            onChange={(e) => (!e.target.checked) ? setSelected(selected.filter((value) => value !== e.target.value)) : setSelected([...selected, e.target.value])}
          />
        ))}
      </CheckboxGroup>
    </div >
  );
}