import { Row, Col, Text, Title, Button, ButtonGroup, Tag } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../../search/hooks/useUrl"
import useTab from "../hooks/useTab"
import useAggregateData from "../../search/hooks/useAggregationData"
import useSearchData from "../hooks/useSearchData"

export default function NetworkFilters() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { currentQuery, currentFilters, handleFilterChange, handleDeleteFilter, clearFilters, handleRangeFilterChange } =
    useUrl()
  const { isLoading, isError } = useAggregateData("filters")
  const { search } = useSearchData(currentTab, false)

  return (
    <Row gutters className="fr-mb-1w">
      <Col xs="12">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            <Title as="h2" className="fr-text--lg fr-text--bold fr-m-0">
              {intl.formatMessage({ id: "networks.filters.title" })}
            </Title>
          </div>
          {Object.keys(currentFilters)?.length ? (
            <div>
              <Button
                icon="delete-bin-line"
                iconPosition="right"
                onClick={clearFilters}
                disabled={isLoading || isError}
                variant="text"
                size="sm"
                color="pink-macaron"
              >
                {intl.formatMessage({ id: "networks.filters.clear" })}
              </Button>
            </div>
          ) : null}
        </div>
      </Col>
      {Object.entries(currentFilters)
        ?.filter(([field, filter]) => field && filter?.values?.length)
        ?.map(([field, filter]) => (
          <Col xs="12" key={field}>
            <Text bold as="span" size="sm">
              {intl.formatMessage({ id: `networks.filters.current.publications.${field}` })} :
            </Text>
            <br />
            <Row verticalAlign="middle">
              {filter.type === "range" && (
                <Tag
                  as="button"
                  className="fr-mb-1v custom-dismissible-tag"
                  onClick={() => handleRangeFilterChange({ field })}
                >
                  {filter.values?.[0]?.value} - {filter.values?.[1]?.value}
                </Tag>
              )}
              {filter.type === "bool" &&
                filter.values?.map(({ value, label }) => (
                  <>
                    <Tag
                      as="button"
                      key={value.toString()}
                      className="fr-mb-1v custom-dismissible-tag"
                      onClick={() => handleDeleteFilter({ field })}
                    >
                      {label || value?.toString()}
                    </Tag>
                  </>
                ))}
              {filter.type === "terms" &&
                filter.values?.map(({ value, label }, i) => (
                  <>
                    <Tag
                      as="button"
                      key={value.toString()}
                      className="fr-mb-1v custom-dismissible-tag"
                      onClick={() => handleFilterChange({ field, value })}
                    >
                      {label || value?.toString()}
                    </Tag>
                    {i !== filter.values?.length - 1 ? `${filter?.operator === "and" ? " & " : " | "}` : null}
                  </>
                ))}
            </Row>
          </Col>
        ))}
      <Col xs="12">
        <ButtonGroup size="md">
          <Button
            icon="add-circle-line"
            iconPosition="left"
            as="button"
            aria-controls="publications-filters"
            data-fr-opened="false"
            disabled={Boolean(search.error) || search.isFetching || !currentQuery || isLoading || isError}
            variant="secondary"
          >
            {intl.formatMessage({ id: "networks.filters.add" })}
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}
