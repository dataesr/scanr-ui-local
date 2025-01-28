import { useIntl } from "react-intl"
import useOptions from "../../../hooks/useOptions"
import { NETWORK_PARAMETERS } from "../../../config/parameters"

export default function InputMaxNodes() {
  const intl = useIntl()
  const {
    parameters: { maxComponents },
    handleParameterChange,
  } = useOptions()

  const defaultValues = NETWORK_PARAMETERS["maxComponents"]
  return (
    <div className="fr-mb-2w fr-range-group" id="network-input-max-components-group">
      <label className="fr-label">
        {intl.formatMessage({ id: "networks.parameters.input-max-components.label" })}
        <span className="fr-hint-text">{intl.formatMessage({ id: "networks.parameters.input-max-components.hint" })}</span>
      </label>
      <div className="fr-range fr-range--sm">
        <span className="fr-range__output">{maxComponents}</span>
        <input
          id="network-input-max-components-range"
          type="range"
          aria-labelledby="network-input-max-components-label"
          min={defaultValues.min}
          max={defaultValues.max}
          value={maxComponents}
          onChange={(event) => handleParameterChange("maxComponents", event.target.value)}
        />
        <span className="fr-range__min" aria-hidden="true">
          {defaultValues.min}
        </span>
        <span className="fr-range__max" aria-hidden="true">
          {defaultValues.max}
        </span>
      </div>
    </div>
  )
}
