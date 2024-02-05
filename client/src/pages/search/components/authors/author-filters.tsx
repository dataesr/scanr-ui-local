import {
  Button, Container, SelectableTag, Tag, TagGroup, Text
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
  const { currentFilters, handleFilterChange, clearFilters } = useUrl()
  const { data = { byAward: [] }, isLoading, isError } = useAggregateData('filters')

  const { byAward } = data as AuthorsAggregations

  const [seeMoreAwards, setSeeMoreAwards] = useState(false)

  return (
    <>
      <button
        className="fr-tag filter-tag-button fr-icon-equalizer-line fr-icon fr-tag--icon-left"
        aria-controls="author-filters"
        data-fr-opened="false"
        disabled={isLoading || isError}
      >
        <FormattedMessage id={intl.formatMessage({ id: "search.top.filters-button-label" })} />
        {currentFilters.length ? <span className="filter-count-badge">{currentFilters.length}</span> : null}
      </button>
      <Modal id="author-filters" size="lg" title={intl.formatMessage({ id: "search.top.filters.authors.title" })}>
        <hr className="fr-mt-3w" />
        {currentFilters.length ? (<Container fluid className="fr-mb-2w">
          <div className="fr-mb-2w" style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flexGrow: 1, flexShrink: 0 }}>
              <Text className="fr-my-1w" bold size="md">
                {intl.formatMessage({ id: "search.authors.filters.active-filter-title" })}
              </Text>
            </div>
            <button
              className="fr-tag delete-filter-tag-button fr-icon-delete-bin-line fr-icon fr-tag--icon-left fr-tag--pink-macaron"
              onClick={clearFilters}
            >
              <FormattedMessage id={intl.formatMessage({ id: "search.top.filters.clear" })} />
            </button>
          </div>
          {currentFilters.map((filter) => (
            <div key={filter.field}>
              Type de author :
              {' '}
              {filter.value.map((value, i) => (
                <>
                  <Tag
                    size="sm"
                    key={value}
                    className="fr-mr-1v"
                    color="blue-cumulus"
                  >
                    {value}
                  </Tag>
                  {(i !== filter.value?.length - 1) ? ' ou ' : null}
                </>

              ))}
            </div>
          ))}
        </Container>) : null}
        {currentFilters.length ? <hr className="fr-mt-3w" /> : null}
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
                selected={currentFilters.find((el) => el.field === 'awards.label')?.value?.includes(type.value)}
                key={type.value}
                onClick={() => handleFilterChange('awards.label', type.value)}
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
            const element = document.getElementById("author-filters")
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