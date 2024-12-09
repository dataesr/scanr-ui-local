import { SearchBar, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useUrl from "../../../search/hooks/useUrl"
import { networkQuery } from "../../config/query"
import { useNetworkContext } from "../../context"
import NetworkGetStartedPage from "../get-started/template"

export default function NetworkSearchBarGetStarted() {
  const intl = useIntl()
  const { setGetStartedPage } = useNetworkContext()
  const { handleQueryChange } = useUrl()

  return (
    <NetworkGetStartedPage title={"What are you looking for ?"}>
      <label className="fr-label fr-mb-1w">{"Rechercher"}</label>
      <SearchBar
        isLarge
        buttonLabel={intl.formatMessage({ id: "networks.search-bar.button-label" })}
        placeholder={intl.formatMessage({ id: "networks.search-bar.placeholder" })}
        onSearch={(value) => {
          handleQueryChange(networkQuery(value))
          setGetStartedPage(2)
        }}
      />
      <Text size="sm" className="fr-mt-5w">
        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
        repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
        voluptates repudiandae sint et molestiae non recusandae.
      </Text>
    </NetworkGetStartedPage>
  )
}
