import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"

export default function NetworkSelectSourceModal() {
  const intl = useIntl()
  const id = "networks-options-select-source-modal"

  return (
    <Modal id={id} size="lg" title={"Source"}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={["publications"]}
          selectionMode="single"
          onSelectionChange={() => {
            const element = document.getElementById(id)
            // @ts-expect-error dsfr does not have types
            window.dsfr(element).modal.conceal()
          }}
        >
          <ListboxItem
            key={"publications"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />}
            description="Corpus de publications scanR"
          >
            {intl.formatMessage({ id: "networks.select-source.publications" })}
          </ListboxItem>
        </Listbox>
      </Container>
    </Modal>
  )
}
