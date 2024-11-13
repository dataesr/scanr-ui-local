import { useIntl } from "react-intl"
import { Row, Col, Button, ButtonGroup } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import useTab from "../../hooks/useTab"
import useClusters from "../../hooks/useClusters"
import useIntegration from "../../hooks/useIntegration"

export default function ClustersButton() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { integrationOptions } = useIntegration()
  const { clusters: computeClusters, handleClustersChange } = useClusters()
  const { search, currentQuery } = useSearchData(currentTab, computeClusters)

  if (integrationOptions.useClustersButton === false) return null

  return (
    <Row gutters>
      <Col xs="12">
        <ButtonGroup size="md">
          <Button
            iconPosition="right"
            icon={computeClusters ? "arrow-up-line" : "arrow-down-line"}
            onClick={() => handleClustersChange(!computeClusters)}
            disabled={search.isFetching || Boolean(search.error) || !currentQuery}
          >
            {intl.formatMessage({
              id: computeClusters ? "networks.clusters.button.rm" : "networks.clusters.button.add",
            })}
          </Button>
        </ButtonGroup>
        <p className="fr-text--xs fr-text-mention--grey">
          {intl.formatMessage({ id: "networks.clusters.button.description" })}
        </p>
      </Col>
    </Row>
  )
}
