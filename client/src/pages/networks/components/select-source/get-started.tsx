import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import NetworkGetStartedPage from "../get-started/template"
import { NETWORKS_SOURCES } from "../../config/sources"
import useGetStarted from "../../hooks/useGetStarted"
import useOptions from "../../hooks/useOptions"

export default function NetworkSelectSourceGetStarted() {
  const intl = useIntl()
  const { currentSource } = useOptions()
  const { handlePageChange } = useGetStarted()

  return (
    <NetworkGetStartedPage title={intl.formatMessage({ id: "networks.get-started.select-source.title" })}>
      <Text>{intl.formatMessage({ id: "networks.get-started.select-source.description" })}</Text>
      <Listbox
        selectedKeys={["publications"]}
        selectionMode="single"
        onSelectionChange={(value) => {
          const selected = Object.values(value)[0] || currentSource
          handlePageChange({ source: selected })
        }}
      >
        {NETWORKS_SOURCES.map(({ label, icon }) => (
          <ListboxItem
            key={label}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
            description={intl.formatMessage({ id: `networks.source.${label}.description` })}
          >
            {intl.formatMessage({ id: `networks.source.${label}` })}
          </ListboxItem>
        ))}
      </Listbox>
    </NetworkGetStartedPage>
  )
}
