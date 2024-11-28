import { useIntl } from "react-intl"
import { Row, Col, Button, ButtonGroup } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import useTab from "../../hooks/useTab"
import useIntegration from "../../hooks/useIntegration"
import useParameters from "../../hooks/useParameters"

export default function ClustersButton() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { integrationOptions } = useIntegration()
  const { parameters, handleParametersChange } = useParameters()
  const { search, currentQuery } = useSearchData(currentTab)

  if (integrationOptions.showClustersButton === false) return null

  return (
    <Row gutters>
      <Col xs="12">
        <ButtonGroup size="md">
          <Button
            iconPosition="right"
            icon={parameters.clusters ? "arrow-up-line" : "arrow-down-line"}
            onClick={() => handleParametersChange("clusters", !parameters.clusters)}
            disabled={search.isFetching || Boolean(search.error) || !currentQuery}
          >
            {intl.formatMessage({
              id: parameters.clusters ? "networks.clusters.button.rm" : "networks.clusters.button.add",
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
