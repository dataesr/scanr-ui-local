import { Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import ToggleNormalize from "./toggle-normalize"
import { useIntl } from "react-intl"

export default function TrendsParametersModal() {
  const intl = useIntl()

  return (
    <Modal
      id={"trends-options-parameters-modal"}
      size="lg"
      title={intl.formatMessage({ id: "trends.parameters.modal.title" })}
    >
      <Container fluid className="fr-mb-4w">
        <ToggleNormalize />
      </Container>
    </Modal>
  )
}
