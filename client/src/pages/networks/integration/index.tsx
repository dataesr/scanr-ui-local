import { useIntl, createIntl, RawIntlProvider } from "react-intl"
import { Container, Row, Col, SearchBar, Tabs, Tab, Title, Text, useDSFRConfig } from "@dataesr/dsfr-plus"
import { networkTabs, networkTabFindLabel, networkTabFindIndex } from "../config/tabs"
import { networkQuery } from "../config/query"
import { messages } from "../config/messages"
import useScreenSize from "../../../hooks/useScreenSize"
import useUrl from "../../search/hooks/useUrl"
import useTab from "../hooks/useTab"
import useClusters from "../hooks/useClusters"
import useIntegration from "../hooks/useIntegration"
import Graph from "../components/graph"
import Home from "../components/home"
import ClustersSection from "../components/clusters"
import ClustersButton from "../components/button"
import NetworkFilters from "../components/filters"
import PublicationFilters from "../../search/components/publications/filters"
import NetworkExports from "../components/exports"
import ClustersAnalytics from "../components/analytics"
import Info from "../components/info"
import { useState } from "react"

function NetworksPage() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentQuery, handleQueryChange } = useUrl()
  const { currentTab, handleTabChange } = useTab()
  const { clusters: computeClusters, handleClustersChange } = useClusters()
  const { integrationOptions } = useIntegration()
  const [focusItem, setFocusItem] = useState("")
  const resetFocus = () => setFocusItem("")
  const isMobile = screen === "sm" || screen === "xs"

  console.log("options", integrationOptions)

  return (
    <>
      <Container>
        {integrationOptions?.enableFilters && (
          <Col xs="12" sm="4" lg="2">
            <PublicationFilters />
          </Col>
        )}
        {isMobile && integrationOptions?.enableSearch && (
          <SearchBar
            className="fr-mb-2w"
            key={currentQuery}
            buttonLabel={intl.formatMessage({ id: "networks.top.main-search-bar" })}
            defaultValue={currentQuery || ""}
            placeholder={intl.formatMessage({ id: "networks.top.main-search-bar-placeholder" })}
            onSearch={(value) => {
              handleQueryChange(networkQuery(value))
              resetFocus()
            }}
          />
        )}
        {isMobile && integrationOptions?.enableFilters && <NetworkFilters />}
      </Container>
      <Container className="fr-mt-4w">
        {integrationOptions?.displayTitle && (
          <>
            <Title as="h3">{intl.formatMessage({ id: "networks.header.title" })}</Title>
            <Text as="p" size="lg">
              {intl.formatMessage({ id: "networks.header.subtitle" })} <Info href="/about/FAQ?question=q58" />
            </Text>
          </>
        )}
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
                {networkTabs
                  .filter(({ label }) => (integrationOptions?.singleTab ? label === currentTab : true))
                  .map(({ label, icon }) => (
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
              {!isMobile && integrationOptions?.enableSearch && (
                <SearchBar
                  className="fr-mb-2w"
                  key={currentQuery}
                  buttonLabel={intl.formatMessage({ id: "networks.top.main-search-bar" })}
                  defaultValue={currentQuery || ""}
                  placeholder={intl.formatMessage({ id: "networks.top.main-search-bar-placeholder" })}
                  onSearch={(value) => {
                    handleQueryChange(networkQuery(value))
                    resetFocus()
                  }}
                />
              )}
              {!isMobile && integrationOptions?.enableFilters && (
                <>
                  <NetworkFilters />
                  <hr />
                </>
              )}
              {integrationOptions?.enableExports && (
                <>
                  <NetworkExports />
                  <hr />
                </>
              )}
              {integrationOptions?.displayClustersButton && (
                <>
                  <ClustersButton
                    handleChange={(value: boolean) => {
                      handleClustersChange(value)
                      resetFocus()
                    }}
                  />
                  <p className="fr-text--xs fr-text-mention--grey">
                    {intl.formatMessage({ id: "networks.clusters.button.description" })}
                  </p>
                </>
              )}
              {integrationOptions?.displayClustersAnalytics && <ClustersAnalytics />}
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
