import { useIntl } from "react-intl"
import { Button, ButtonGroup, Container } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"
import useOptions from "../../hooks/useOptions"

export default function ClustersButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const { parameters, handleParameterChange } = useOptions()
  const { search } = useSearchData()

  if (integrationOptions.showClustersButton === false) return null

  return (
    <Container fluid>
      <ButtonGroup size="md">
        <Button
          iconPosition="right"
          icon={parameters.clusters ? "arrow-up-line" : "arrow-down-line"}
          onClick={() => handleParameterChange("clusters", !parameters.clusters)}
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
