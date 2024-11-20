import { Accordion } from "@dataesr/dsfr-plus"
import InputMaxNodes from "./input-max-nodes"
import InputMaxComponents from "./input-max-components"
import SelectLayout from "./select-layout"
import AutocompleteFilterNode from "./autocomplete-filter-node"
import { useIntl } from "react-intl"

export default function NetworkOptions() {
  const intl = useIntl()

  return (
    <Accordion title={intl.formatMessage({ id: "networks.parameters.title" })} className="fr-mb-2w">
      <InputMaxNodes />
      <InputMaxComponents />
      {/* <AutocompleteFilterNode /> */}
      <SelectLayout />
    </Accordion>
  )
}
