import {
  Button, Container, SelectableTag, TagGroup, Text, MenuButton, MenuItem
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
  const { currentFilters, handleFilterChange, api } = useUrl()
  const { data = { byKind: [], byLevel: [] } } = useAggregateData('filters')

  const { byKind, byLevel } = data as OrganizationAggregations

  const [seeMoreNature, setSeeMoreNature] = useState(false)

  const id = `${api}-filters`;

  return (
    <>
      <Modal id={id} size="lg" title={intl.formatMessage({ id: "search.top.filters.organizations.title" })}>
        <Container fluid className="fr-my-2w">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flexGrow: 1 }}>
              <Text className="fr-mt-3w fr-mb-0" bold size="md">
                <FormattedMessage id="search.organizations.filters.by-kind" />
              </Text>
              <Text className="fr-card__detail fr-mb-2w" size="sm">
                <FormattedMessage id="search.organizations.filters.by-kind-description" />
              </Text>
            </div>
            <MenuButton label="Union" className="fr-ml-2w" placement="end" size="sm" aria-label="Options" variant="text" icon="union" onAction={() => { }}>
              <MenuItem
                key="union"
                className="fr-py-1v fr-px-2w"
                description={
                  <>
                    Combiner les valeurs sélectionnées
                    <br />
                    avec l'opérateur 'OU'
                  </>
                }
                startContent={<span className="fr-icon-union fr-mr-2w" />}
              >
                <span className="fr-text--sm">
                  Union
                </span>
              </MenuItem>
              <MenuItem
                key="intersect"
                className="fr-py-1v fr-px-2w"
                description={
                  <>
                    Combiner les valeurs sélectionnées
                    <br />
                    avec l'opérateur 'ET'
                  </>
                }
                startContent={<span className="fr-icon-intersect fr-mr-2w" />}
              >
                <span className="fr-text--sm">
                  Intersection
                </span>
              </MenuItem>
            </MenuButton>
          </div>
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