import { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, TextInput } from "@dataesr/react-dsfr";

export default function KeywordFacet({ key, label, data }) {
  const [bool, setBool] = useState(defaultValue);

  useEffect(() => {
    onChange(bool);
  }, [bool]);

  return (
    <div className="facet">
      <Toggle
        size="sm"
        defaultChecked={selected.includes(element.value)}
        key={element.value}
        value={element.value}
        label={`${element.label} (${element.count})`}
        onChange={(e) => (!e.target.checked) ? setBool(selected.filter((value) => value !== e.target.value)) : setBool([...selected, e.target.value])}
      />
    </div >
  );
}