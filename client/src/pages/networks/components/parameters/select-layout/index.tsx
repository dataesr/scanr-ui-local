import { Container, Select, SelectOption, Text } from "@dataesr/dsfr-plus"
import useParameters from "../../../hooks/useParameters"

export default function SelectLayout() {
  const { parameters, handleParametersChange } = useParameters()

  return (
    <Container fluid>
      <Text className="fr-label fr-mb-1v" size="md">
        Network layout
      </Text>
      <Text className="fr-hint-text fr-mb-1w">Network layout spatialization</Text>
      <Select selectedKey={parameters.layout} onSelectionChange={(key) => handleParametersChange("layout", key.toString())}>
        <SelectOption key={"forceatlas"}>forceAtlasV2</SelectOption>
        <SelectOption key={"vosviewer"}>VosViewer</SelectOption>
      </Select>
    </Container>
  )
}
