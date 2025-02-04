import { useIntl } from "react-intl"
import { Button, ButtonGroup } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import useIntegration from "../../hooks/useIntegration"
import useOptions from "../../hooks/useOptions"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function ClustersButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const { parameters, handleParameterChange } = useOptions()
  const { search } = useSearchData()

  if (integrationOptions.showClustersButton === false) return null

  return (
    <ButtonGroup size={["xs", "sm"].includes(screen) ? "sm" : "md"} className="fr-ml-1w">
      <Button
        title={intl.formatMessage({ id: "networks.clusters.button.description" })}
        iconPosition="right"
        icon={parameters.clusters ? "arrow-up-line" : "arrow-down-line"}
        onClick={() => handleParameterChange("clusters", !parameters.clusters)}
        disabled={search.isFetching || Boolean(search.error)}
      >
        {screen === "xs"
          ? intl.formatMessage({
              id: parameters.clusters ? "networks.clusters.button.rm.short" : "networks.clusters.button.add.short",
            })
          : intl.formatMessage({
              id: parameters.clusters ? "networks.clusters.button.rm" : "networks.clusters.button.add",
            })}
      </Button>
    </ButtonGroup>
  )
}
