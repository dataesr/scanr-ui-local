import { Toggle } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../../context"
import { useIntl } from "react-intl"

export default function ToggleNormalize() {
  const intl = useIntl()
  const { normalized, setNormalized } = useTrendsContext()

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
