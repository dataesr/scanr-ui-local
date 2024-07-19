import { useState } from "react"
import { FormattedMessage, useIntl, createIntl, RawIntlProvider } from "react-intl"
import { Container, Breadcrumb, Link, Row, Col, SearchBar, Tabs, Tab, Title, Text, useDSFRConfig } from "@dataesr/dsfr-plus"
import { networkTabs, networkTabFindLabel, networkTabFindIndex } from "./config/tabs"
import { networkQuery } from "./config/query"
import { messages } from "./config/messages"
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
import IconLink from "../../components/icon-link"

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
      <Container className="bg-network" fluid>
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
          {intl.formatMessage({ id: "networks.header.subtitle" })}{" "}
          <IconLink
            href="/about/FAQ?question=q58"
            icon="question-line"
            title={intl.formatMessage({ id: "networks.header.subtitle-hover" })}
            target="_blank"
          />
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
