import { useIntl } from "react-intl"
import { Row, Col, Button, ButtonGroup } from "@dataesr/dsfr-plus"
import useSearchData from "../hooks/useSearchData"
import useTab from "../hooks/useTab"
import useClusters from "../hooks/useClusters"

type ClustersButtonArgs = {
  handleChange: (value: boolean) => void
}

export default function ClustersButton({ handleChange }: ClustersButtonArgs) {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { clusters: computeClusters } = useClusters()
  const { search, currentQuery } = useSearchData(currentTab, computeClusters)

  return (
    <Row gutters>
      <Col xs="12">
        <ButtonGroup size="md">
          <Button
            iconPosition="right"
            icon={computeClusters ? "arrow-up-line" : "arrow-down-line"}
            onClick={() => handleChange(!computeClusters)}
            disabled={search.isFetching || Boolean(search.error) || !currentQuery}
          >
            {intl.formatMessage({
              id: computeClusters ? "networks.clusters.button.rm" : "networks.clusters.button.add",
            })}
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}
