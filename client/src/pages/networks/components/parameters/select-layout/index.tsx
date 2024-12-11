// import { useIntl } from "react-intl"
// import { Container, Select, SelectOption, Text } from "@dataesr/dsfr-plus"
// import useParameters from "../../../hooks/useParameters"

// export default function SelectLayout() {
//   const intl = useIntl()
//   const { parameters, handleParametersChange } = useParameters()

//   return (
//     <Container fluid className="fr-mb-3w">
//       <Text className="fr-label fr-mb-1v" size="md">
//         {intl.formatMessage({ id: "networks.parameters.select-layout.label" })}
//       </Text>
//       <Text className="fr-hint-text fr-mb-1w">{intl.formatMessage({ id: "networks.parameters.select-layout.hint" })}</Text>
//       <Select selectedKey={parameters.layout} onSelectionChange={(key) => handleParametersChange("layout", key.toString())}>
//         <SelectOption key={"forceatlas"}>forceAtlas2</SelectOption>
//         <SelectOption key={"vosviewer"}>VosViewer</SelectOption>
//       </Select>
//     </Container>
//   )
// }
