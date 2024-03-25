import { useIntl } from "react-intl"
import { Container, Row, Col, Button, Spinner } from "@dataesr/dsfr-plus"
import useSearchClusters from "../hooks/useSearchClusters"
import useSearchData from "../hooks/useSearchData"
import useTab from "../hooks/useTab"

export default function ClustersButton({
  states,
  handleChange,
  show,
}: {
  states: any,
  handleChange: any
  show: boolean
}) {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { search } = useSearchData(currentTab)
  const { search: searchClusters } = useSearchClusters(currentTab, show ? false : states[currentTab])

  if (!show) return null
  if (!search?.data || search.isFetching) return null

  return (
    <Container fluid>
      <Row gutters>
        <Button
          iconPosition="right"
          icon={states[currentTab] ? "arrow-up-line" : "arrow-down-line"}
          variant="secondary"
          onClick={() => handleChange(currentTab)}
        >
          {intl.formatMessage({
            id: states[currentTab] ? "networks.clusters.button.rm" : "networks.clusters.button.add",
          })}
        </Button>
      </Row>
      {searchClusters.isFetching && <Spinner size={30} />}
    </Container >
  )
}
