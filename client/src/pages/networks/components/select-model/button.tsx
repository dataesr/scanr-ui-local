import { Button } from "@dataesr/dsfr-plus"
import useTab from "../../hooks/useTab"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"

export default function NetworkSelectModelButton() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()
  const { currentTab } = useTab()

  if (integrationOptions.showSelectModel === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="git-branch-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-select-tab-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {intl.formatMessage({ id: `networks.tab.${currentTab}` })}
    </Button>
  )
}
