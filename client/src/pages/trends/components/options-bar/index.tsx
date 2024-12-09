import { Button, Col, Container, Row } from "@dataesr/dsfr-plus"
import useUrl from "../../../search/hooks/useUrl"
import { useIntl } from "react-intl"
import useScreenSize from "../../../../hooks/useScreenSize"
import { useTrendsContext } from "../../context"

export default function TrendsOptionsBar() {
  const intl = useIntl()
  const { model, source } = useTrendsContext()
  const { screen } = useScreenSize()
  const { currentQuery } = useUrl()

  const isEmptyQuery = !currentQuery || currentQuery === "*"
  const shortQuery = (currentQuery?.length || 0) > 20 ? currentQuery.slice(0, 17) + "..." : currentQuery

  console.log("screen", screen)
  return (
    <Container className="fr-mb-2w">
      <Row>
        <Col xs={12} sm={10} md={8} lg={8} xl={8}>
          <Row horizontalAlign="left">
            <Button
              icon="search-line"
              iconPosition="left"
              as="button"
              aria-controls="trends-options-search-bar-modal"
              data-fr-opened="false"
              variant={isEmptyQuery ? "tertiary" : "secondary"}
            >
              {isEmptyQuery ? "Tout" : shortQuery}
            </Button>
            <Button
              className="fr-ml-1w"
              icon={"book-2-line"}
              iconPosition="left"
              as="button"
              aria-controls="trends-options-select-model-modal"
              data-fr-opened="false"
              variant="secondary"
            >
              {intl.formatMessage({ id: `trends.select-model.${model}` })}
            </Button>
            <Button
              className="fr-ml-1w"
              icon={source === "publications" ? "article-line" : "chat-3-line"}
              iconPosition="left"
              as="button"
              aria-controls="trends-options-select-source-modal"
              data-fr-opened="false"
              variant="secondary"
            >
              {intl.formatMessage({ id: `trends.select-source.${source}` })}
            </Button>
          </Row>
        </Col>
        <Col xs={12} sm={2} md={4} lg={4} xl={4}>
          <Row className={screen === "xs" ? "fr-mt-1w" : ""} horizontalAlign={screen === "xs" ? "left" : "right"}>
            <Button
              className="fr-mr-1w"
              icon="more-line"
              iconPosition="right"
              as="button"
              aria-controls="trends-filters"
              data-fr-opened="false"
              variant={"tertiary"}
            >
              {["xs", "sm", "md"].includes(screen) ? "" : "Filtres"}
            </Button>
            <Button
              icon="equalizer-line"
              iconPosition="right"
              as="button"
              aria-controls="trends-options-parameters-modal"
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
