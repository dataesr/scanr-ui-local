import { FormattedMessage, useIntl, createIntl, RawIntlProvider } from "react-intl"
import { Container, Breadcrumb, Link, Row, Col, SearchBar, Tabs, Tab, Title, Text, useDSFRConfig } from "@dataesr/dsfr-plus"
import useScreenSize from "../../hooks/useScreenSize"
import useUrl from "../search/hooks/useUrl"
import useTab from "./hooks/useTab"
import useClusters from "./hooks/useClusters"
import Graph from "./components/graph"
import Home from "./components/home"
import ClustersSection from "./components/clusters"
import ClustersButton from "./components/button"
import NetworkFilters from "./components/filters"
import PublicationFilters from "../search/components/publications/filters"
import NetworkExports from "./components/exports"
import ClustersAnalytics from "./components/analytics"
import Info from "./components/info"
import { useState } from "react"

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
})
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1]
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc
}, {})

const NETWORK_TABS_MAPPING = {
  domains: {
    index: 0,
    label: "domains",
    icon: "book-2-line",
  },
  authors: {
    index: 1,
    label: "authors",
    icon: "user-line",
  },
  institutions: {
    index: 2,
    label: "institutions",
    icon: "building-line",
  },
  structures: {
    index: 3,
    label: "structures",
    icon: "microscope-line",
  },
  software: {
    index: 4,
    label: "software",
    icon: "terminal-box-line",
  },
}

const networkQuery = (query: string) => query || "*"
const networkTabs = Object.values(NETWORK_TABS_MAPPING).sort((a, b) => a.index - b.index)
const networkTabFindIndex = (label: string) => networkTabs.findIndex((tab) => tab.label === label)
const networkTabFindLabel = (index: number) => networkTabs[index].label

function NetworksPage() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentQuery, handleQueryChange } = useUrl()
  const { currentTab, handleTabChange } = useTab()
  const { clusters: computeClusters, handleClustersChange } = useClusters()
  const [focusItem, setFocusItem] = useState("")
  const resetFocus = () => setFocusItem("")

  const isMobile = screen === "sm" || screen === "xs"

  return (
    <>
      <Container className={"bg-network"} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              <FormattedMessage id="networks.top.breadcrumb.home" />
            </Link>
            <Link current>{intl.formatMessage({ id: "networks.top.breadcrumb.explore" })}</Link>
          </Breadcrumb>
          <Row gutters className="fr-pb-4w fr-mb-2w">
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={currentQuery}
                isLarge
                buttonLabel={intl.formatMessage({ id: "networks.top.main-search-bar" })}
                defaultValue={currentQuery || ""}
                placeholder={intl.formatMessage({ id: "networks.top.main-search-bar-placeholder" })}
                onSearch={(value) => {
                  handleQueryChange(networkQuery(value))
                  resetFocus()
                }}
              />
            </Col>
            <Col xs="12" sm="4" lg="2">
              <PublicationFilters />
            </Col>
          </Row>
          {isMobile && <NetworkFilters />}
        </Container>
      </Container>
      <Container className="fr-mt-4w">
        <Title as="h3">{intl.formatMessage({ id: "networks.header.title" })}</Title>
        <Text as="p" size="lg">
          {intl.formatMessage({ id: "networks.header.subtitle" })} <Info href="/about/FAQ?question=q58" />
        </Text>
        <Row>
          <Col xs="12" lg="8">
            <Container fluid as="section">
              <Tabs
                defaultActiveIndex={networkTabFindIndex(currentTab)}
                onTabChange={(index) => {
                  handleTabChange(networkTabFindLabel(index))
                  resetFocus()
                }}
              >
                {networkTabs.map(({ label, icon }) => (
                  <Tab index={label} label={intl.formatMessage({ id: `networks.header.tab.${label}` })} icon={icon}>
                    <Home currentTab={label} />
                    <Graph currentTab={label} computeClusters={computeClusters} focusItem={focusItem} />
                  </Tab>
                ))}
              </Tabs>
              <ClustersSection currentTab={currentTab} enabled={computeClusters} setFocusItem={setFocusItem} />
            </Container>
          </Col>
          <Col xs="12" lg="4">
            <Container className={isMobile ? "fr-ml-0" : "fr-ml-1w"}>
              {!isMobile && <NetworkFilters />}
              <hr />
              <NetworkExports />
              <hr />
              <ClustersButton
                handleChange={(value: boolean) => {
                  handleClustersChange(value)
                  resetFocus()
                }}
                show={true}
              />
              <p className="fr-text--xs fr-text-mention--grey">
                {intl.formatMessage({ id: "networks.clusters.button.description" })}
              </p>
              <ClustersAnalytics />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default function Networks() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })
  return (
    <RawIntlProvider value={intl}>
      <NetworksPage />
    </RawIntlProvider>
  )
}
