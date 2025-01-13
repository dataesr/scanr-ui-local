import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import NetworkGetStartedPage from "../get-started/template"
import useGetStarted from "../../hooks/useGetStarted"

export default function NetworkSelectSourceGetStarted() {
  const intl = useIntl()
  const { handlePageChange } = useGetStarted()

  return (
    <NetworkGetStartedPage title={intl.formatMessage({ id: "networks.get-started.select-source.title" })}>
      <Text>{intl.formatMessage({ id: "networks.get-started.select-source.description" })}</Text>
      <Listbox selectedKeys={["publications"]} selectionMode="single" onSelectionChange={() => handlePageChange()}>
        <ListboxItem
          key={"publications"}
          startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />}
          description="Corpus de publications scanR"
        >
          {intl.formatMessage({ id: "networks.select-source.publications" })}
        </ListboxItem>
      </Listbox>
    </NetworkGetStartedPage>
  )
}
