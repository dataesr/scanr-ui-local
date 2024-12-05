import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"

export default function TrendsSelectSourceModal() {
  const intl = useIntl()
  const { source, setSource } = useTrendsContext()
  const id = "trends-options-select-source-modal"

  return (
    <Modal id={id} size="lg" title={"Source"}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={[source]}
          selectionMode="single"
          onSelectionChange={(value) => {
            setSource(Object.values(value)[0])
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        >
          <ListboxItem
            key={"publications"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />}
            description="Nombre de publications"
          >
            {intl.formatMessage({ id: "trends.select-source.publications" })}
          </ListboxItem>
          <ListboxItem
            key={"citations"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-chat-3-line`} />}
            description="Nombre de citations"
          >
            {intl.formatMessage({ id: "trends.select-source.citations" })}
          </ListboxItem>
        </Listbox>
      </Container>
    </Modal>
  )
}
