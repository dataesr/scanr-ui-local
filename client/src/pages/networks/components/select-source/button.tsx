import { Button } from "@dataesr/dsfr-plus"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function NetworkSelectSourceButton() {
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
    >
      {["xs", "sm"].includes(screen) ? null : "Publications"}
    </Button>
  )
}
