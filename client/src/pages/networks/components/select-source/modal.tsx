import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"
import useOptions from "../../../trends/hooks/useOptions"
import { NETWORKS_SOURCES } from "../../config/sources"

export default function NetworkSelectSourceModal() {
  const intl = useIntl()
  const { handleSourceChange } = useOptions()
  const id = "networks-options-select-source-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.select-source.modal.title" })}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={["publications"]}
          selectionMode="single"
          onSelectionChange={(value) => {
            handleSourceChange(Object.values(value)[0])
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        >
          {NETWORKS_SOURCES.map(({ label, icon }) => (
            <ListboxItem
              key={label}
              startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
              description={intl.formatMessage({ id: `networks.source.${label}.description` })}
            >
              {intl.formatMessage({ id: `networks.source.${label}` })}
            </ListboxItem>
          ))}
        </Listbox>
      </Container>
    </Modal>
  )
}
