import { Button, Container } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useSearchData from "../../hooks/useSearchData"
import useUrl from "../../../search/hooks/useUrl"
import Modal from "../../../../components/modal"
import PatentYearFilter from "../../../search/components/patents/filters/years"
import PatentRegionFilter from "../../../search/components/patents/filters/region-switch"

export default function NetworkFiltersPatentsModal() {
  const intl = useIntl()
  const { clearFilters } = useUrl()
  const {
    search: { isFetching },
  } = useSearchData()

  const id = "networks-options-filters-modal"

  return (
    <>
      <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.filters.modal.patents.title" })}>
        <Container fluid className="fr-my-2w">
          <PatentYearFilter />
          <hr className="fr-mt-3w" />
        </Container>
        <Container fluid className="fr-my-2w">
          <PatentRegionFilter />
          <hr className="fr-mt-3w" />
        </Container>
        <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            <Button variant="secondary" onClick={() => clearFilters()}>
              {intl.formatMessage({ id: "networks.filters.modal.clear" })}
            </Button>
          </div>
          <Button
            disabled={isFetching}
            onClick={() => {
              const element = document.getElementById(id)
              // @ts-expect-error dsfr does not have types
              window.dsfr(element).modal.conceal()
            }}
          >
            {intl.formatMessage({ id: "networks.filters.modal.display" })}
          </Button>
        </div>
      </Modal>
    </>
  )
}
