import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { networkTabs } from "../../config/tabs"
import { useIntl } from "react-intl"
import useTab from "../../hooks/useTab"

export default function NetworkSelectModelModal() {
  const intl = useIntl()
  const { currentTab, handleTabChange } = useTab()
  const id = "networks-options-select-tab-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.select-model.modal.title" })}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={[currentTab]}
          selectionMode="single"
          onSelectionChange={(value) => {
            handleTabChange(Object.values(value)[0])
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        >
          {networkTabs.map(({ label, icon }) => (
            <ListboxItem
              startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
              key={label}
              description={intl.formatMessage({ id: `networks.tab.${label}.description` })}
            >
              {intl.formatMessage({ id: `networks.tab.${label}` })}
            </ListboxItem>
          ))}
        </Listbox>
      </Container>
    </Modal>
  )
}
