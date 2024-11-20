import { Button, Container, Row, Text } from "@dataesr/dsfr-plus"
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
      <Container
        fluid
        className="fr-mb-3w"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container fluid style={{ flexGrow: 1 }}>
          <Text className="fr-m-0" size="lg" bold>
            {intl.formatMessage({ id: "organizations.network.title" })}
          </Text>
        </Container>
      </Container>
      <Container fluid className="fr-mt-2w" style={{ height: "400px" }}>
        <VOSviewerOnline key={[value, theme]} data={network} parameters={parameters} />
      </Container>
      <Row horizontalAlign="right" className="fr-mb-2w">
        <Button as="a" color="blue-ecume" variant="primary" icon="arrow-right-s-line" iconPosition="right" href={networkUrl}>
          {intl.formatMessage({ id: "organizations.network.search" })}
        </Button>
      </Row>
      <hr />
    </>
  )
}
