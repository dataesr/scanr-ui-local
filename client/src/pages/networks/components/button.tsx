import { useIntl } from "react-intl"
import { Row, Col, Button, ButtonGroup } from "@dataesr/dsfr-plus"
import useSearchData from "../hooks/useSearchData"
import useTab from "../hooks/useTab"

export default function ClustersButton({
  clustersTabs,
  handleChange,
  show,
}: {
  clustersTabs: any
  handleChange: any
  show: boolean
}) {
  const intl = useIntl()
  const { currentTab } = useTab()
  const enableClusters = show ? clustersTabs[currentTab] : false
  const { search, currentQuery } = useSearchData(currentTab, enableClusters)

  if (!show) return null

  return (
    <Row gutters>
      <Col xs="12">
        <ButtonGroup size="md">
          <Button
            iconPosition="right"
            icon={enableClusters ? "arrow-up-line" : "arrow-down-line"}
            variant="secondary"
            onClick={() => handleChange(currentTab)}
            disabled={search.isFetching || Boolean(search.error) || !currentQuery}
          >
            {intl.formatMessage({
              id: enableClusters ? "networks.clusters.button.rm" : "networks.clusters.button.add",
            })}
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}
