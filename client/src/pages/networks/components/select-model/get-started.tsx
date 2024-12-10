import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import { networkTabs } from "../../config/tabs"
import { useIntl } from "react-intl"
import useTab from "../../hooks/useTab"
import NetworkGetStartedPage from "../get-started/template"
import useGetStarted from "../../hooks/useGetStarted"

export default function NetworkSelectModelGetStarted() {
  const intl = useIntl()
  const { navigateToNetwork } = useGetStarted()
  const { currentTab } = useTab()

  return (
    <NetworkGetStartedPage title={intl.formatMessage({ id: "networks.get-started.select-model.title" })}>
      <Text size="sm">{intl.formatMessage({ id: "networks.get-started.select-model.description" })}</Text>
      <Text size="sm"></Text>
      <Listbox
        selectedKeys={[currentTab]}
        selectionMode="single"
        selectionBehavior="replace"
        onSelectionChange={(value) => {
          const selected = Object.values(value)[0] || currentTab
          navigateToNetwork({ tab: selected })
        }}
      >
        {networkTabs.map(({ label, icon }) => (
          <ListboxItem
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
            key={label}
            description={intl.formatMessage({ id: `networks.tab.${label}.description` })}
          >
            {intl.formatMessage({ id: `networks.tab.${label}` })}
          </ListboxItem>
        ))}
      </Listbox>
    </NetworkGetStartedPage>
  )
}
