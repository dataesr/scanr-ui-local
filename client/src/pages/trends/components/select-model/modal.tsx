import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"
import { getOpenAlexMapping } from "../../config/openalex"

export default function TrendsSelectModelModal() {
  const intl = useIntl()
  const { model, setModel } = useTrendsContext()
  const id = "trends-options-select-model-modal"

  const openAlexMapping = getOpenAlexMapping()
  console.log(openAlexMapping)

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "trends.select-model.modal.title" })}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={[model]}
          selectionMode="single"
          onSelectionChange={(value) => {
            const selected = Object.values(value)[0]
            selected && setModel(selected)
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        >
          <ListboxItem
            key={"entity-fishing"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.entity-fishing.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.entity-fishing" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-topics"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-topics.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-topics" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-subfields"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-subfields.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-subfields" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-fields"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-fields.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-fields" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-domains"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-domains.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-domains" })}
          </ListboxItem>
        </Listbox>
      </Container>
    </Modal>
  )
}
