import { Button } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"
import useOptions from "../../hooks/useOptions"

export default function TrendsSelectSourceButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const { currentSource } = useOptions()

  if (integrationOptions.showSelectSource === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon={currentSource === "publications" ? "article-line" : "chat-3-line"}
      iconPosition="left"
      as="button"
      aria-controls="trends-options-select-source-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {["xs", "sm"].includes(screen) ? null : intl.formatMessage({ id: `trends.select-source.${currentSource}` })}
    </Button>
  )
}
