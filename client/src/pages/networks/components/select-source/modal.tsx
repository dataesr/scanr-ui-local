import { Button, Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"
import { NETWORK_SOURCES } from "../../config/sources"
import useOptions from "../../hooks/useOptions"
import useIntegration from "../../hooks/useIntegration"

export default function NetworkSelectSourceModal() {
  const intl = useIntl()
  const { integrationId } = useIntegration()
  const { currentSource, handleSourceChange } = useOptions()
  const id = "networks-options-select-source-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.select-source.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pb-4w">
        <Listbox
          selectedKeys={[currentSource]}
          selectionMode="single"
          onSelectionChange={(value) => {
            const selected = Object.values(value)[0]
            selected && handleSourceChange(selected)
          }}
        >
          {integrationId ? (
            <ListboxItem
              key={NETWORK_SOURCES[0].label}
              startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${NETWORK_SOURCES[0].icon}`} />}
              description={intl.formatMessage({
                id: `networks.source.${NETWORK_SOURCES[0].label}.description`,
              })}
            >
              {intl.formatMessage({ id: `networks.source.${NETWORK_SOURCES[0].label}` })}
            </ListboxItem>
          ) : (
            NETWORK_SOURCES.map(({ label, icon }) => (
              <ListboxItem
                key={label}
                startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
                description={intl.formatMessage({ id: `networks.source.${label}.description` })}
              >
                {intl.formatMessage({ id: `networks.source.${label}` })}
              </ListboxItem>
            ))
          )}
        </Listbox>
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", justifyContent: "right" }}>
        <Button aria-controls={id}>{intl.formatMessage({ id: "networks.select-source.modal.display" })}</Button>
      </div>
    </Modal>
  )
}
