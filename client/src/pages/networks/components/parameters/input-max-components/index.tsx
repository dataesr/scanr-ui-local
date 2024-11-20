import { TextInput } from "@dataesr/dsfr-plus"
import useParameters from "../../../hooks/useParameters"

export default function InputMaxComponents() {
  const { parameters, handleParametersChange } = useParameters()

  return (
    <TextInput
      label="Max number of composantes"
      hint="Number from 1 to 10"
      type="number"
      min={1}
      max={10}
      placeholder="Number"
      value={parameters.maxComponents}
      onChange={(event) => handleParametersChange("maxComponents", Number(event.target.value))}
    />
  )
}
