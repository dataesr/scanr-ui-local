import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import InputMaxNodes from "./input-max-nodes"
import InputMaxComponents from "./input-max-components"
import SelectLayout from "./select-layout"
import { useIntl } from "react-intl"

export default function NetworkParametersModal() {
  const intl = useIntl()

  return (
    <Modal
      id={"networks-options-parameters-modal"}
      size="lg"
      title={intl.formatMessage({ id: "networks.options-bar.parameters.modal.label" })}
    >
      <Container fluid className="fr-mb-4w">
        <InputMaxNodes />
        <InputMaxComponents />
        <SelectLayout />
      </Container>
    </Modal>
  )
}
