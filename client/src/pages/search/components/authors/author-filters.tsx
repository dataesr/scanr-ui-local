import {
  Button, Container, SelectableTag, TagGroup, Text
} from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import Modal from "../../../../components/modal";
import BaseSkeleton from "../../../../components/skeleton/base-skeleton";
import { AuthorsAggregations } from "../../../../types/author";
import { useState } from "react";
import useUrl from "../../hooks/useUrl";
import useAggregateData from "../../hooks/useAggregationData";

const SEE_MORE_AFTER = 8

export default function AuthorFilters() {
  const intl = useIntl()
  const { total, search: { isFetching } } = useSearchData();
  const { currentFilters, handleFilterChange, api } = useUrl()
  const { data = { byAward: [] } } = useAggregateData('filters')

  const { byAward } = data as AuthorsAggregations

  const [seeMoreAwards, setSeeMoreAwards] = useState(false)
  const id = `${api}-filters`;

  return (
    <>
      <Modal id={id} size="lg" title={intl.formatMessage({ id: "search.top.filters.authors.title" })}>
        <Container fluid className="fr-my-2w">
          <Text className="fr-mt-3w fr-mb-0" bold size="md">
            <FormattedMessage id="search.authors.filters.by-award" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.authors.filters.by-award-description" />
          </Text>
          <TagGroup>
            {byAward.slice(0, seeMoreAwards ? 10000 : SEE_MORE_AFTER).map((type) => (
              <SelectableTag
                selected={currentFilters?.['awards.label']?.values?.map(v => v.value)?.includes(type.value)}
                key={type.value}
                onClick={() => handleFilterChange({ field: 'awards.label', value: type.value })}
              >
                {type.label}
              </SelectableTag>
            ))}
          </TagGroup>
          {seeMoreAwards
            ? <Button variant="text" size="sm" onClick={() => setSeeMoreAwards(false)}>{intl.formatMessage({ id: "search.filters.see-less" })}</Button>
            : <Button variant="text" size="sm" onClick={() => setSeeMoreAwards(true)}>{intl.formatMessage({ id: "search.filters.see-more" })}</Button>}
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
                { id: "search.top.authors.filters.result-count" },
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