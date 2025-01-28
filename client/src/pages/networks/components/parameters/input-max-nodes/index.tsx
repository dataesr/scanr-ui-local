import { useIntl } from "react-intl"
import useOptions from "../../../hooks/useOptions"
import { NETWORK_PARAMETERS } from "../../../config/parameters"

export default function InputMaxNodes() {
  const intl = useIntl()
  const {
    parameters: { maxNodes },
    handleParameterChange,
  } = useOptions()

  const defaultValues = NETWORK_PARAMETERS["maxNodes"]

  return (
    <div className="fr-mb-2w fr-range-group" id="network-input-max-nodes-group">
      <label className="fr-label">
        {intl.formatMessage({ id: "networks.parameters.input-max-nodes.label" })}
        <span className="fr-hint-text">{intl.formatMessage({ id: "networks.parameters.input-max-nodes.hint" })}</span>
      </label>
      <div className="fr-range fr-range--sm">
        <span className="fr-range__output">{maxNodes}</span>
        <input
          id="network-input-max-nodes-range"
          type="range"
          min={defaultValues.min}
          max={defaultValues.max}
          value={maxNodes}
          defaultValue={maxNodes}
          onChange={(event) => handleParameterChange("maxNodes", event.target.value)}
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
