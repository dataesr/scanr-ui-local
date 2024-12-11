import { Row, Col, Text, Button, ButtonGroup, Tag, Accordion } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"
import useAggregateData from "../../../search/hooks/useAggregationData"
import useTrends from "../../hooks/useTrends"

export default function TrendsFilters() {
  const intl = useIntl()
  const { currentQuery, currentFilters, handleFilterChange, handleDeleteFilter, clearFilters, handleRangeFilterChange } =
    useUrl()
  const { isLoading, isError } = useAggregateData("filters")
  const { isFetching: trendsIsFetching, error: trendsError } = useTrends()

  const filtersCount = Object.keys(currentFilters)?.length

  return (
    <Accordion
      className="fr-mb-2w"
      title={`${intl.formatMessage({ id: "trends.filters.title" })}${filtersCount ? ` (${filtersCount})` : ""}`}
    >
      <Row gutters>
        <Col xs="12">
          <div style={{ display: "flex", alignItems: "center" }}>
            {filtersCount ? (
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
                  {intl.formatMessage({ id: "trends.filters.clear" })}
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
                {intl.formatMessage({ id: `trends.filters.current.publications.${field}` })} :
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
              aria-controls="trends-filters"
              data-fr-opened="false"
              disabled={Boolean(trendsError) || trendsIsFetching /*|| !currentQuery*/ || isLoading || isError}
              variant="secondary"
            >
              {intl.formatMessage({ id: "trends.filters.add" })}
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Accordion>
  )
}
