import { useIntl } from "react-intl"
import useTab from "../../hooks/useTab"
import useIntegration from "../../hooks/useIntegration"
import { Select, SelectOption } from "@dataesr/dsfr-plus"
import { networkTabs } from "../../config/tabs"

export default function NetworkSelectModel() {
  const intl = useIntl()
  const { currentTab, handleTabChange } = useTab()
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showSelectModel === false) return null

  return (
    <Select
      label={intl.formatMessage({ id: "networks.select-model.label" })}
      selectedKey={currentTab}
      onSelectionChange={(key) => handleTabChange(key.toString())}
    >
      {networkTabs.map(({ label, icon }) => (
        <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />} key={label}>
          {intl.formatMessage({ id: `networks.tab.${label}` })}
        </SelectOption>
      ))}
    </Select>
  )
}
