import { TextInput } from "@dataesr/dsfr-plus"
import useParameters from "../../../hooks/useParameters"

export default function InputMaxNodes() {
  const { parameters, handleParametersChange } = useParameters()

  return (
    <TextInput
      label="Max number of nodes"
      hint="Number from 1 to 1000"
      type="number"
      min={1}
      max={1000}
      placeholder="Number"
      value={parameters.maxNodes}
      onChange={(event) => handleParametersChange("maxNodes", Number(event.target.value))}
    />
  )
}
