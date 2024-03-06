import { IntlShape } from "react-intl"
import { Container, Row, Button, Spinner } from "@dataesr/dsfr-plus"
import useSearchClusters from "../hooks/useSearchClusters"
import useSearchData from "../hooks/useSearchData"

export default function ClustersButton({
  intlValue: intl,
  currentTab,
  enabled,
  handleChange,
}: {
  intlValue: IntlShape
  currentTab: string
  enabled: boolean
  handleChange: any
}) {
  const { search } = useSearchData(currentTab)
  const { search: searchClusters } = useSearchClusters(currentTab, enabled)

  if (!search?.data || search.isFetching) return <></>

  return (
    <Container className="fr-mt-3w">
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Button
          className="fr-mr-2w"
          iconPosition="right"
          icon={enabled ? "arrow-up-line" : "arrow-down-line"}
          variant="tertiary"
          onClick={() => handleChange(currentTab)}
        >
          {intl.formatMessage({
            id: enabled ? "networks.clusters.button.rm" : "networks.clusters.button.add",
          })}
        </Button>
        {searchClusters.isFetching && <Spinner size={30} />}
      </Row>
    </Container>
  )
}
