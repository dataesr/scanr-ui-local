import { Row, Col, Text, Title, DissmissibleTag, TagGroup, Tag } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import useUrl from "../../hooks/useUrl";
import useAggregateData from "../../hooks/useAggregationData";

export default function CurrentFilters() {
  const intl = useIntl()
  const { currentFilters, handleFilterChange, clearFilters, api } = useUrl()
  const { isLoading, isError } = useAggregateData('filters')


  return (
    <Row gutters className="fr-mb-1w">
      <Col xs="12">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            <Title as="h2" className="fr-text--lg fr-text--bold fr-m-0">
              Filtres
            </Title>
          </div>
        </div>
      </Col>
      {currentFilters.filter(filter => filter?.value).map((filter) => (
        <Col xs="12" key={filter.field}>
          <Text bold as="span" size="sm">
            {intl.formatMessage({ id: `search.filters.current.${api}.${filter.field}` })} :
          </Text>
          {' '}
          {filter.value.map((value, i) => (
            <>
              <DissmissibleTag
                size="sm"
                key={value}
                className="fr-mr-1w fr-mb-0"
                onClick={(e) => {
                  e.preventDefault();
                  handleFilterChange(filter.field, value)
                }}
              >
                {value.toString()}
              </DissmissibleTag>
              {(i !== filter.value?.length - 1) ? ' ou ' : null}
            </>

          ))}
        </Col>
      ))}
      {currentFilters.length ? (
        <Col xs="12">
          <TagGroup>
            <Tag
              icon="add-circle-line"
              iconPosition="left"
              as="button"
              aria-controls={`${api}-filters`}
              data-fr-opened="false"
              disabled={isLoading || isError}
            >
              {intl.formatMessage({ id: "search.filters.add" })}
            </Tag>
            <Tag
              as="button"
              color="pink-macaron"
              icon="delete-bin-line"
              iconPosition="right"
              onClick={clearFilters}
            >
              {intl.formatMessage({ id: "search.filters.clear" })}
            </Tag>
          </TagGroup>
        </Col>
      ) : (
        <Col xs="12">
          <TagGroup>
            <Tag
              icon="add-circle-line"
              iconPosition="left"
              as="button"
              aria-controls={`${api}-filters`}
              data-fr-opened="false"
              disabled={isLoading || isError}
            >
              {intl.formatMessage({ id: "search.filters.add" })}
            </Tag>
          </TagGroup>
        </Col>
      )}
    </Row>
  )
}