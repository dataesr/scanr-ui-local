import { Container, SearchBar } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import useUrl from "../../../search/hooks/useUrl"
import { useIntl } from "react-intl"
import { networkQuery } from "../../config/query"

export default function NetworkSearchBarModal() {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useUrl()
  const id = "networks-options-search-bar-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.search-bar.modal.title" })}>
      <Container fluid className="fr-mb-4w">
        <SearchBar
          key={currentQuery}
          buttonLabel={intl.formatMessage({ id: "networks.search-bar.button-label" })}
          defaultValue={currentQuery || ""}
          placeholder={intl.formatMessage({ id: "networks.search-bar.placeholder" })}
          onSearch={(value) => {
            handleQueryChange(networkQuery(value))
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        />
      </Container>
    </Modal>
  )
}
