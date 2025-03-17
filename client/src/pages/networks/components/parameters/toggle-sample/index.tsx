import { useIntl } from "react-intl"
import { Toggle } from "@dataesr/dsfr-plus"
import useOptions from "../../../hooks/useOptions"

export default function ToggleSample() {
  const intl = useIntl()
  const {
    parameters: { sample },
    handleParameterChange,
  } = useOptions()

  return (
    <Toggle
      label={intl.formatMessage({ id: "networks.parameters.toggle-sample.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.toggle-sample.hint" })}
      checked={sample}
      onChange={(event) => handleParameterChange("sample", event.target.checked)}
    />
  )
}
