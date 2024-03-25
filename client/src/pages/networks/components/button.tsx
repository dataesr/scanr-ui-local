import { useIntl } from "react-intl"
import { Container, Row, Button, Spinner } from "@dataesr/dsfr-plus"
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
  const { search } = useSearchData(currentTab, show ? false : states[currentTab])

  if (!show) return null

  return (
    <Container fluid>
      <Row>
        <Button
          iconPosition="right"
          icon={states[currentTab] ? "arrow-up-line" : "arrow-down-line"}
          variant="secondary"
          onClick={() => handleChange(currentTab)}
          disabled={search.isFetching || Boolean(search.error)}
        >
          {intl.formatMessage({
            id: states[currentTab] ? "networks.clusters.button.rm" : "networks.clusters.button.add",
          })}
        </Button>
      </Row>
      {search.isFetching &&
        <Row><Spinner size={30} /></Row>}
    </Container >
  )
}
