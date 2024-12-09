import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import NetworkGetStartedPage from "../get-started/template"
import useGetStarted from "../../hooks/useGetStarted"

export default function NetworkSelectSourceGetStarted() {
  const intl = useIntl()
  const { navigateToNextPage } = useGetStarted()

  return (
    <NetworkGetStartedPage title={"Quelle source voulez vous utiliser ?"}>
      <Text size="sm">
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
      </Text>
      <Listbox selectedKeys={["publications"]} selectionMode="single" onSelectionChange={() => navigateToNextPage()}>
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
