import { Button } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"
import useOptions from "../../hooks/useOptions"

export default function TrendsSelectModelButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const { currentModel } = useOptions()

  if (integrationOptions.showSelectModel === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon={"book-2-line"}
      iconPosition="left"
      as="button"
      aria-controls="trends-options-select-model-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {["xs", "sm"].includes(screen) ? null : intl.formatMessage({ id: `trends.select-model.${currentModel}` })}
    </Button>
  )
}
