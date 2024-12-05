import { Button, Col, Container, Row } from "@dataesr/dsfr-plus"
import useUrl from "../../../search/hooks/useUrl"
import useTab from "../../hooks/useTab"
import { networkTabFindIcon } from "../../config/tabs"
import { useIntl } from "react-intl"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function NetworksOptionsBar() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentQuery, currentFilters } = useUrl()
  const { currentTab } = useTab()
  const currentTabIcon = networkTabFindIcon(currentTab)

  const isEmptyQuery = !currentQuery || currentQuery === "*"
  const shortQuery = currentQuery?.length || 0 > 20 ? currentQuery.slice(0, 17) + "..." : currentQuery

  const affiliationsFiltersCount = ["authors.person", "affiliations.id", "affiliations.country"].reduce(
    (acc, key) => acc + (currentFilters?.[key]?.values?.length || 0),
    0
  )

  return (
    <Container className="fr-mb-2w">
      <Row>
        <Col lg={8}>
          <Row horizontalAlign="left">
            <Button
              icon="search-line"
              iconPosition="left"
              as="button"
              aria-controls="networks-options-search-bar-modal"
              data-fr-opened="false"
              variant={isEmptyQuery ? "tertiary" : "secondary"}
            >
              {isEmptyQuery ? "Tout" : shortQuery}
            </Button>
            <Button
              className="fr-ml-1w"
              icon={currentTabIcon}
              iconPosition="left"
              as="button"
              aria-controls="networks-options-select-tab-modal"
              data-fr-opened="false"
              variant="secondary"
            >
              {intl.formatMessage({ id: `networks.tab.${currentTab}` })}
            </Button>
            <Button
              className="fr-ml-1w"
              icon="article-line"
              iconPosition="left"
              as="button"
              aria-controls="networks-options-select-source-modal"
              data-fr-opened="false"
              variant="secondary"
            >
              {"Publications"}
            </Button>
            <Button
              className="fr-ml-1w"
              icon="team-line"
              iconPosition="left"
              as="button"
              aria-controls="networks-options-filters-affiliations-modal"
              data-fr-opened="false"
              variant={affiliationsFiltersCount ? "secondary" : "tertiary"}
            >
              {affiliationsFiltersCount ? `Affiliations (${affiliationsFiltersCount})` : "Affiliations"}
            </Button>
          </Row>
        </Col>
        <Col lg={4}>
          <Row horizontalAlign="right">
            <Button
              className="fr-mr-2w"
              icon="more-line"
              iconPosition="right"
              as="button"
              aria-controls="networks-filters"
              data-fr-opened="false"
              variant={"tertiary"}
            >
              {["xs", "sm", "md"].includes(screen) ? "" : "Filtres"}
            </Button>
            <Button
              icon="equalizer-line"
              iconPosition="right"
              as="button"
              aria-controls="networks-options-parameters-modal"
              data-fr-opened="false"
              variant={"tertiary"}
            >
              {["xs", "sm", "md"].includes(screen) ? "" : "Paramètres"}
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
