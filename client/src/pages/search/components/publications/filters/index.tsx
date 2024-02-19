import { Button, Container, Text } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import useSearchData from "../../../hooks/useSearchData";
import Modal from "../../../../../components/modal";
import BaseSkeleton from "../../../../../components/skeleton/base-skeleton";
import useUrl from "../../../hooks/useUrl";
import PublicationFunderFilter from "./funders";
import PublicationAuthorFilter from "./authors";
import PublicationTypeFilter from "./types";
import PublicationYearFilter from "./years";
import PublicationAccessFilter from "./access";


export default function PublicationFilters() {
  const intl = useIntl()
  const { total, search: { isFetching } } = useSearchData();
  const { api } = useUrl()
  const id = `${api}-filters`

  return (
    <>
      <Modal id={id} size="lg" title={intl.formatMessage({ id: "search.top.filters.publications.title" })}>
        <Container fluid className="fr-my-2w">
          <PublicationYearFilter />
          <hr className="fr-mt-3w" />
          <PublicationTypeFilter />
          <hr className="fr-mt-3w" />
          <PublicationAuthorFilter />
          <hr className="fr-mt-3w" />
          <PublicationAccessFilter />
          <hr className="fr-mt-3w" />
          <PublicationFunderFilter />
          <hr className="fr-mt-3w" />
        </Container>
        <div className='fr-modal__footer fr-px-0' style={{ display: 'flex', width: '100%', alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            {(total && total === 10000) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
              {intl.formatMessage({ id: "search.top.result-more-than" })}
            </Text>) : null
            }
            {(total && total > 0) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
              {intl.formatMessage(
                { id: "search.top.publications.filters.result-count" },
                { count: total }
              )}
            </Text>) : <BaseSkeleton height="1.25rem" width="30%" />}
          </div>
          <Button disabled={isFetching} onClick={() => {
            const element = document.getElementById(id)
            // @ts-expect-error dsfr does not have types
            window.dsfr(element).modal.conceal()
          }}>
            {intl.formatMessage({ id: "search.top.filters.display" })}
          </Button>
        </div>
      </Modal>
    </>
  )
}