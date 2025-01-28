import { useIntl } from "react-intl"
import { TextInput } from "@dataesr/dsfr-plus"
import useOptions from "../../../hooks/useOptions"

export default function InputMaxNodes() {
  const intl = useIntl()
  const { parameters, handleParameterChange } = useOptions()

  return (
    <TextInput
      label={intl.formatMessage({ id: "networks.parameters.input-max-nodes.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.input-max-nodes.hint" })}
      type="number"
      min={10}
      max={1000}
      value={parameters.maxNodes}
      onChange={(event) => handleParameterChange("maxNodes", Number(event.target.value))}
    />
  )
}
