import { Button, Container, Text } from "@dataesr/dsfr-plus"
import { Network } from "../../../../../types/network"
import { VOSviewerOnline } from "vosviewer-online"
import { stringifySearchFiltersForURL } from "../../../../search/hooks/useUrl"
import { useIntl } from "react-intl"

type OrganizationNetworkProps = {
  data: Network
  value: string
  label?: string
}

export default function OrganizationNetwork({ data: network, value, label }: OrganizationNetworkProps) {
  const intl = useIntl()

  if (!network) return null

  const theme = document.documentElement.getAttribute("data-fr-scheme")
  const parameters = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: true,
  }

  const networkFilter = stringifySearchFiltersForURL({
    "affiliations.id": {
      type: "terms",
      values: [{ value: value, label: label }],
    },
  })
  const networkUrl = `/networks?q=*&tab=domains&filters=${networkFilter}`

  return (
    <>
      <div
        className="fr-mb-1w"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ flexGrow: 1 }} className="fr-m-0" size="lg" bold>
          {intl.formatMessage({ id: "organizations.network.title" })}
        </Text>
        <Button as="a" variant="text" icon="arrow-right-s-line" iconPosition="right" href={networkUrl}>
          {intl.formatMessage({ id: "organizations.network.search" })}
        </Button>
      </div>
      <Text className="fr-m-0 fr-text-mention-grey" size="sm">
        {intl.formatMessage({ id: "organizations.network.desc" })}
        {intl.formatMessage({ id: "organizations.network.desc2" })}
      </Text>
      <Container fluid className="fr-mt-2w" style={{ height: "400px" }}>
        <VOSviewerOnline key={[value, theme]} data={network} parameters={parameters} />
      </Container>
      <Text className="fr-m-0 fr-text-mention-grey" size="xs">
        {intl.formatMessage({ id: "organizations.network.desc3" })}
      </Text>
      <hr className="fr-mt-5w" />
    </>
  )
}
