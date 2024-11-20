import { useIntl } from "react-intl"
import { TextInput } from "@dataesr/dsfr-plus"
import useParameters from "../../../hooks/useParameters"

export default function InputMaxNodes() {
  const intl = useIntl()
  const { parameters, handleParametersChange } = useParameters()

  return (
    <TextInput
      label={intl.formatMessage({ id: "networks.parameters.input-max-nodes.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.input-max-nodes.hint" })}
      type="number"
      min={1}
      max={1000}
      value={parameters.maxNodes}
      onChange={(event) => handleParametersChange("maxNodes", Number(event.target.value))}
    />
  )
}
