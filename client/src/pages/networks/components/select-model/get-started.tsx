import { Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import { networkTabs } from "../../config/tabs"
import { useIntl } from "react-intl"
import useTab from "../../hooks/useTab"
import NetworkGetStartedPage from "../get-started/template"
import { useNetworkContext } from "../../context"

export default function NetworkSelectModelGetStarted() {
  const intl = useIntl()
  const { setGetStartedPage } = useNetworkContext()
  const { currentTab, handleTabChange } = useTab()

  return (
    <NetworkGetStartedPage title={"Which network do you want to build ?"}>
      <Listbox
        selectedKeys={[currentTab]}
        selectionMode="single"
        onSelectionChange={(value) => {
          handleTabChange(Object.values(value)[0])
          setGetStartedPage(3)
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
