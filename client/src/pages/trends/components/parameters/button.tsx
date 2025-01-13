import { Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"

export default function TrendsParametersButton() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()
  const { screen } = useScreenSize()

  if (integrationOptions.showParameters === false) return null

  return (
    <Button
      className="fr-mt-1w"
      icon="equalizer-line"
      iconPosition="left"
      as="button"
      aria-controls="trends-options-parameters-modal"
      data-fr-opened="false"
      variant={"tertiary"}
    >
      {["xs", "sm", "mg"].includes(screen) ? "" : intl.formatMessage({ id: "trends.parameters.button.label" })}
    </Button>
  )
}
