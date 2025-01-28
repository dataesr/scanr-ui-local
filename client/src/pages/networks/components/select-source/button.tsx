import { useIntl } from "react-intl"
import { Button } from "@dataesr/dsfr-plus"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"
import useOptions from "../../hooks/useOptions"

export default function NetworkSelectSourceButton() {
  const intl = useIntl()
  const { currentSource } = useOptions()
  const { integrationOptions } = useIntegration()
  const { screen } = useScreenSize()

  if (integrationOptions.showSelectSource === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="article-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-select-source-modal"
      data-fr-opened="false"
      variant="secondary"
      title={intl.formatMessage({ id: "networks.select-source.modal.title" })}
    >
      {["xs", "sm"].includes(screen) ? null : intl.formatMessage({ id: `networks.source.${currentSource}` })}
    </Button>
  )
}
