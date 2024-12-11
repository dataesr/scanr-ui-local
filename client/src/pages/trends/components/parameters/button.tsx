import { Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import { useIntl } from "react-intl"

export default function TrendsParametersButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()

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
