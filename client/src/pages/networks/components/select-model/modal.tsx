import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { NETWORKS_MODELS } from "../../config/models"
import { useIntl } from "react-intl"
import useOptions from "../../hooks/useOptions"

export default function NetworkSelectModelModal() {
  const intl = useIntl()
  const { currentModel, currentSource, handleModelChange } = useOptions()
  const id = "networks-options-select-model-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.select-model.modal.title" })}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={[currentModel]}
          selectionMode="single"
          onSelectionChange={(value) => {
            handleModelChange(Object.values(value)[0])
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        >
          {NETWORKS_MODELS[currentSource].map(({ label, icon }) => (
            <ListboxItem
              startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
              key={label}
              description={intl.formatMessage({ id: `networks.model.${label}.description` })}
            >
              {intl.formatMessage({ id: `networks.model.${label}` })}
            </ListboxItem>
          ))}
        </Listbox>
      </Container>
    </Modal>
  )
}
