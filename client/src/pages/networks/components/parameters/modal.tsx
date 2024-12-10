import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import InputMaxNodes from "./input-max-nodes"
import InputMaxComponents from "./input-max-components"
import { useIntl } from "react-intl"

export default function NetworkParametersModal() {
  const intl = useIntl()

  return (
    <Modal
      id={"networks-options-parameters-modal"}
      size="lg"
      title={intl.formatMessage({ id: "networks.parameters.modal.label" })}
    >
      <Container fluid className="fr-mb-4w">
        <InputMaxNodes />
        <InputMaxComponents />
        {/* <SelectLayout /> */}
        {/* <SelectClustering /> */}
      </Container>
    </Modal>
  )
}
