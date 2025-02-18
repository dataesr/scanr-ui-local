import { Toggle } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useOptions from "../../../hooks/useOptions"

export default function ToggleNormalize() {
  const intl = useIntl()
  const { normalized, setNormalized } = useOptions()

  return (
    <Toggle
      checked={normalized}
      name="toggle-normalize"
      label={intl.formatMessage({ id: "trends.parameters.toggle-normalize.label" })}
      hint={intl.formatMessage({ id: "trends.parameters.toggle-normalize.hint" })}
      onChange={(event) => setNormalized(event.target.checked)}
    />
  )
}
