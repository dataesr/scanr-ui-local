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
    <NetworkGetStartedPage title={"Quelles communautés souhaitez-vous visualiser ?"}>
      <Text size="sm">
        {
          "Les différentes communautés sont obtenues par co-occurence au sein du corpus de documents correspondant à la recherche effectuée. \
          Les réseaux sont composés de noeuds representant les différents élements reliés entre eux en fonction de leur nombre de co-occurence."
        }
      </Text>
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
