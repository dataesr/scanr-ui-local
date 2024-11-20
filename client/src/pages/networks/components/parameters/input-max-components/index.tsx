import { useIntl } from "react-intl"
import { TextInput } from "@dataesr/dsfr-plus"
import useParameters from "../../../hooks/useParameters"

export default function InputMaxComponents() {
  const intl = useIntl()
  const { parameters, handleParametersChange } = useParameters()

  return (
    <TextInput
      label={intl.formatMessage({ id: "networks.parameters.input-max-components.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.input-max-components.hint" })}
      type="number"
      min={1}
      max={10}
      placeholder="Number"
      value={parameters.maxComponents}
      onChange={(event) => handleParametersChange("maxComponents", Number(event.target.value))}
    />
  )
}
