import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { networkTabs } from "../../config/tabs"
import { useIntl } from "react-intl"
import useTab from "../../hooks/useTab"

export default function NetworkSelectModelModal() {
  const intl = useIntl()
  const { currentTab, handleTabChange } = useTab()

  return (
    <Modal id={"networks-options-select-tab-modal"} size="lg" title={"Modèle"}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={[currentTab]}
          selectionMode="single"
          onSelectionChange={(value) => handleTabChange(Object.values(value)[0])}
        >
          {networkTabs.map(({ label, icon }) => (
            <ListboxItem
              startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
              key={label}
              description="A small description"
            >
              {intl.formatMessage({ id: `networks.tab.${label}` })}
            </ListboxItem>
          ))}
        </Listbox>
      </Container>
    </Modal>
  )
}
