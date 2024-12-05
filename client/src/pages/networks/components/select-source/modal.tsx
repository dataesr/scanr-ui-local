import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"

export default function NetworkSelectSourceModal() {
  const intl = useIntl()

  return (
    <Modal id={"networks-options-select-source-modal"} size="lg" title={"Source"}>
      <Container fluid className="fr-mb-4w">
        <Listbox selectionMode="single">
          <ListboxItem
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />}
            description="A small description"
          >
            {intl.formatMessage({ id: "networks.select-source.publications" })}
          </ListboxItem>
        </Listbox>
      </Container>
    </Modal>
  )
}
