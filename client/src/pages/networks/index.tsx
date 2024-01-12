import { FormattedMessage, useIntl, IntlProvider } from "react-intl"
import { Container, Breadcrumb, Link, Row, Col, SearchBar, Tabs, Tab, useDSFRConfig } from "@dataesr/dsfr-plus"
import Error500 from "../../components/errors/error-500"
import { Graph } from "./components/graph"
import useSearchData from "./hooks/useSearchData"

import messagesFr from "./locales/fr.json"
import messagesEn from "./locales/en.json"
import NetworkFilters from "./components/filter"

const messages = {
  fr: messagesFr,
  en: messagesEn,
}

function NetworkTab({ networkTab }: { networkTab: string }) {
  console.log("NetworkTab", networkTab)

  const { search, currentFilters } = useSearchData(networkTab)
  const { data, error, isFetching } = search

  if (error) {
    console.log("error", error)

    if (currentFilters.length > 0) {
      return <div> {`No results with filters ${JSON.stringify(currentFilters)}`} </div>
    }

    return <Error500 />
  }

  return (
    <>
      <div> {`Graph by co-${networkTab}`}</div>
      {!isFetching ? <Graph network={data} /> : <div> currently fetching</div>}
    </>
  )
}

function NetworksPage() {
  const intl = useIntl()
  const { currentQuery, handleQueryChange } = useSearchData()

  return (
    <>
      <Container className={`bg-network`} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              <FormattedMessage id="network.top.breadcrumb.home" />
            </Link>
            <Link current>{intl.formatMessage({ id: "network.top.breadcrumb.explore" })}</Link>
          </Breadcrumb>
          <Row gutters>
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={currentQuery}
                isLarge
                buttonLabel={intl.formatMessage({ id: "network.top.main-search-bar" })}
                defaultValue={currentQuery || ""}
                placeholder={intl.formatMessage({ id: "network.top.main-search-bar" })}
                onSearch={(value) => handleQueryChange(value)}
              />
            </Col>
            <Col xs="12" sm="4" lg="2">
              <NetworkFilters />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="fr-mt-2w">
        <Tabs index="network-tabs">
          <Tab index="authors" label={intl.formatMessage({ id: "network.header.nav.authors" })} icon="user-line">
            <NetworkTab networkTab="authors" />
          </Tab>
          <Tab
            index="institutions"
            label={intl.formatMessage({ id: "network.header.nav.institutions" })}
            icon="building-line"
          >
            <NetworkTab networkTab="institutions" />
          </Tab>
          <Tab index="structures" label={intl.formatMessage({ id: "network.header.nav.structures" })} icon="microscope-line">
            <NetworkTab networkTab="structures" />
          </Tab>
          <Tab index="domains" label={intl.formatMessage({ id: "network.header.nav.domains" })} icon="trophy-line">
            <NetworkTab networkTab="domains" />
          </Tab>
        </Tabs>
      </Container>
      <Container>
        <div className="fr-mb-2w"> Clusters under construction...</div>
      </Container>
    </>
  )
}

export default function Networks() {
  const { locale } = useDSFRConfig()
  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <NetworksPage />
    </IntlProvider>
  )
}
