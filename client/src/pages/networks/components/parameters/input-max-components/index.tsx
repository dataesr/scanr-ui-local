import { useIntl } from "react-intl"
import { TextInput } from "@dataesr/dsfr-plus"
import useOptions from "../../../hooks/useOptions"

export default function InputMaxComponents() {
  const intl = useIntl()
  const { parameters, handleParameterChange } = useOptions()

  return (
    <TextInput
      label={intl.formatMessage({ id: "networks.parameters.input-max-components.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.input-max-components.hint" })}
      type="number"
      min={1}
      max={10}
      placeholder="Number"
      value={parameters.maxComponents}
      onChange={(event) => handleParameterChange("maxComponents", Number(event.target.value))}
    />
  )
}
