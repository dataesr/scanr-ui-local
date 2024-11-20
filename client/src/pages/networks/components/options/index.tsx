import { Accordion, TextInput, Toggle } from "@dataesr/dsfr-plus"
import useParameters from "../../hooks/useParameters"

export default function NetworkOptions() {
  const { parameters, handleParametersChange } = useParameters()

  console.log("parameters", parameters)

  return (
    <Accordion title="Options avancées" className="fr-mb-2w">
      <TextInput
        label="Max number of nodes"
        type="number"
        placeholder="Number"
        value={parameters.maxNodes}
        onChange={(event) => handleParametersChange("maxNodes", Number(event.target.value))}
      />
      <TextInput
        label="Max number of composantes"
        type="number"
        placeholder="Number"
        value={parameters.maxComponents}
        onChange={(event) => handleParametersChange("maxComponents", Number(event.target.value))}
      />
      <Toggle
        checked={parameters.enableClusters}
        label="Louvain clusterization"
        onChange={(event) => handleParametersChange("enableClusters", event.target.checked)}
      />
    </Accordion>
  )
}
