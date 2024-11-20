import { Accordion } from "@dataesr/dsfr-plus"
import InputMaxNodes from "./input-max-nodes"
import InputMaxComponents from "./input-max-components"
import SelectLayout from "./select-layout"
import AutocompleteFilterNode from "./autocomplete-filter-node"

export default function NetworkOptions() {
  return (
    <Accordion title="Options avancées" className="fr-mb-2w">
      <InputMaxNodes />
      <InputMaxComponents />
      {/* <AutocompleteFilterNode /> */}
      <SelectLayout />
    </Accordion>
  )
}
