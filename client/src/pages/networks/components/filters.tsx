import { Row, Col, Text, Title, Button, ButtonGroup, Tag } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../hooks/useUrl"
import useAggregateData from "../../search/hooks/useAggregationData"

export default function NetworkFilters() {
  const intl = useIntl()
  const { currentFilters, handleFilterChange, handleDeleteFilter, clearFilters } = useUrl()
  const { isLoading, isError } = useAggregateData("filters")

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
              {filter.type !== "range" ? (
                filter.values?.map(({ value, label }, i) => (
                  <>
                    <Tag
                      as="button"
                      icon="delete-bin-line"
                      iconPosition="right"
                      key={value}
                      className="fr-mb-1v"
                      onClick={(e) => {
                        e.preventDefault()
                        handleFilterChange({ field, value })
                      }}
                    >
                      {label || value?.toString()}
                    </Tag>
                    {i !== filter.values?.length - 1 ? `${filter?.operator === "and" ? " & " : " | "}` : null}
                  </>
                ))
              ) : (
                <Tag
                  as="button"
                  icon="delete-bin-line"
                  iconPosition="right"
                  className="fr-mb-1v"
                  onClick={(e) => {
                    e.preventDefault()
                    handleDeleteFilter({ field })
                  }}
                >
                  {filter.values?.[0]?.value} - {filter.values?.[1]?.value}
                </Tag>
              )}
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
            disabled={isLoading || isError}
            variant="secondary"
          >
            {intl.formatMessage({ id: "networks.filters.add" })}
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}
