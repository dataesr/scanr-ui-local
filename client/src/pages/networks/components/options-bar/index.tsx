import { Button, Col, Container, Row } from "@dataesr/dsfr-plus"
import useUrl from "../../../search/hooks/useUrl"
import useTab from "../../hooks/useTab"
import { networkTabFindIcon } from "../../config/tabs"
import { useIntl } from "react-intl"
import useScreenSize from "../../../../hooks/useScreenSize"
import NetworkExportsButton from "../exports/button"

export default function NetworksOptionsBar() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentQuery } = useUrl()
  const { currentTab } = useTab()
  const currentTabIcon = networkTabFindIcon(currentTab)

  const isEmptyQuery = !currentQuery || currentQuery === "*"
  const shortQuery = (currentQuery?.length || 0) > 20 ? currentQuery.slice(0, 17) + "..." : currentQuery

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
              icon="git-branch-line"
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
          </Row>
        </Col>
        <Col lg={4}>
          <Row horizontalAlign="right">
            <Button
              className="fr-mr-1w"
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
              className="fr-mr-1w"
              icon="equalizer-line"
              iconPosition="right"
              as="button"
              aria-controls="networks-options-parameters-modal"
              data-fr-opened="false"
              variant={"tertiary"}
            >
              {["xs", "sm", "md"].includes(screen) ? "" : "Paramètres"}
            </Button>
            <NetworkExportsButton />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
