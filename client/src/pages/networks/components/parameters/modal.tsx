import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import InputMaxNodes from "./input-max-nodes"
import InputMaxComponents from "./input-max-components"
import SelectLayout from "./select-layout"

export default function NetworkParametersModal() {
  return (
    <Modal id={"networks-options-parameters-modal"} size="lg" title={"Paramètres"}>
      <Container fluid className="fr-mb-4w">
        <InputMaxNodes />
        <InputMaxComponents />
        <SelectLayout />
      </Container>
    </Modal>
  )
}
