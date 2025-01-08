import { useIntl } from "react-intl"
import { Button, ButtonGroup, Container } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import useTab from "../../hooks/useTab"
import useIntegration from "../../hooks/useIntegration"
import useParameters from "../../hooks/useParameters"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function ClustersButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentTab } = useTab()
  const { integrationOptions } = useIntegration()
  const { parameters, handleParametersChange } = useParameters()
  const { search } = useSearchData(currentTab)

  if (integrationOptions.showClustersButton === false) return null

  return (
    <Container fluid>
      <ButtonGroup size="md">
        <Button
          iconPosition="right"
          icon={parameters.clusters ? "arrow-up-line" : "arrow-down-line"}
          onClick={() => handleParametersChange("clusters", !parameters.clusters)}
          disabled={search.isFetching || Boolean(search.error)}
        >
          {intl.formatMessage({
            id: parameters.clusters ? "networks.clusters.button.rm" : "networks.clusters.button.add",
          })}
        </Button>
      </ButtonGroup>
      {screen != "xs" && (
        <p className="fr-text--xs fr-text-mention--grey">
          {intl.formatMessage({ id: "networks.clusters.button.description" })}
        </p>
      )}
    </Container>
  )
}
