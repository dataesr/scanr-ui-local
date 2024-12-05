import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import ToggleNormalize from "./toggle-normalize"

export default function TrendsParametersModal() {
  return (
    <Modal id={"trends-options-parameters-modal"} size="lg" title={"Paramètres"}>
      <Container fluid className="fr-mb-4w">
        <ToggleNormalize />
      </Container>
    </Modal>
  )
}
