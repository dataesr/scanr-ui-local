import { Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useNetworkContext } from "../../context"
import NetworkGetStartedPage from "../get-started/template"

export default function NetworkSelectSourceGetStarted() {
  const intl = useIntl()
  const { setGetStartedPage } = useNetworkContext()

  return (
    <NetworkGetStartedPage title={"Quelle source utiliser ?"}>
      <Listbox selectedKeys={["publications"]} selectionMode="single" onSelectionChange={() => setGetStartedPage(3)}>
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
