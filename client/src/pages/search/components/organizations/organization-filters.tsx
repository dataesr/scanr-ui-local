import {
  Button, Container, SelectableTag, Tag, TagGroup, Text
} from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import Modal from "../../../../components/modal";
import BaseSkeleton from "../../../../components/skeleton/base-skeleton";
import { useState } from "react";
import { OrganizationAggregations } from "../../../../types/organization";
import useAggregateData from "../../hooks/useAggregationData";
import useUrl from "../../hooks/useUrl";

const SEE_MORE_AFTER = 8


export default function OrganizationFilters() {
  const intl = useIntl()
  const { total, search: { isFetching } } = useSearchData();
  const { currentFilters, handleFilterChange, clearFilters } = useUrl()
  const { data = { byKind: [], byLevel: [] }, isLoading, isError } = useAggregateData('filters')

  const { byKind, byLevel } = data as OrganizationAggregations

  const [seeMoreNature, setSeeMoreNature] = useState(false)

  return (
    <>
      <button
        className="fr-tag filter-tag-button fr-icon-equalizer-line fr-icon fr-tag--icon-left"
        aria-controls="organization-filters"
        data-fr-opened="false"
        disabled={isLoading || isError}
      >
        <FormattedMessage id={intl.formatMessage({ id: "search.top.filters-button-label" })} />
        {currentFilters.length ? <span className="filter-count-badge">{currentFilters.length}</span> : null}
      </button>
      <Modal id="organization-filters" size="lg" title={intl.formatMessage({ id: "search.top.filters.organizations.title" })}>
        <hr className="fr-mt-3w" />
        {currentFilters.length ? (<Container fluid className="fr-mb-2w">
          <div className="fr-mb-2w" style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flexGrow: 1, flexShrink: 0 }}>
              <Text className="fr-my-1w" bold size="md">
                {intl.formatMessage({ id: "search.organizations.filters.active-filter-title" })}
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
              Type de publication :
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
            <FormattedMessage id="search.organizations.filters.by-kind" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.organizations.filters.by-kind-description" />
          </Text>
          <TagGroup>
            {byKind.map((element) => (
              <SelectableTag
                selected={currentFilters.find((el) => el.field === 'kind')?.value?.includes(element.value)}
                key={element.value}
                onClick={() => handleFilterChange('kind', element.value)}
              >
                {element.label}
              </SelectableTag>
            ))}
          </TagGroup>
          <hr className="fr-mt-3w" />
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.organizations.filters.by-level" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.organizations.filters.by-level-description" />
          </Text>
          <TagGroup>
            {byLevel.slice(0, seeMoreNature ? 10000 : SEE_MORE_AFTER).map((element) => (
              <SelectableTag
                selected={currentFilters.find((el) => el.field === 'level')?.value?.includes(element.value)}
                key={element.value}
                color="yellow-tournesol"
                onClick={() => handleFilterChange('level', element.value)}
              >
                {element.label}
              </SelectableTag>
            ))}
          </TagGroup>
          {seeMoreNature
            ? <Button variant="text" size="sm" onClick={() => setSeeMoreNature(false)}>{intl.formatMessage({ id: "search.filters.see-less" })}</Button>
            : <Button variant="text" size="sm" onClick={() => setSeeMoreNature(true)}>{intl.formatMessage({ id: "search.filters.see-more" })}</Button>}
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
                { id: "search.top.organizations.filters.result-count" },
                { count: total }
              )}
            </Text>) : <BaseSkeleton height="1.25rem" width="30%" />}
          </div>
          <Button disabled={isFetching} onClick={() => {
            const element = document.getElementById("organization-filters")
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