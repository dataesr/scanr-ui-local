import { useState } from "react"
import { useIntl, createIntl, RawIntlProvider } from "react-intl"
import { Container, Row, Col, SearchBar, Tabs, Tab, Title, Text } from "@dataesr/dsfr-plus"
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
import locals from "./config/locals.json"

function NetworksPage() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { currentQuery, handleQueryChange } = useUrl()
  const { currentTab, handleTabChange } = useTab()
  const { clusters: computeClusters, handleClustersChange } = useClusters()
  const { integrationId, integrationOptions } = useIntegration()
  const [focusItem, setFocusItem] = useState("")
  const resetFocus = () => setFocusItem("")

  const isLarge = screen === "lg" || screen === "xl"

  if (!integrationId) return "BSO local not defined."

  const integrationComments: string =
    (intl.locale === "en" ? locals?.[integrationId]?.commentsNameEN : locals?.[integrationId]?.commentsName) || ""

  return (
    <>
      <Container className="fr-mt-4w">
        {integrationOptions?.displayTitle && (
          <>
            <Title as="h3">
              {intl.formatMessage({ id: "networks.header.title" }).concat(" ", integrationComments).trim()}
            </Title>
            <Text as="p" size="lg">
              {intl.formatMessage({ id: "networks.header.subtitle" })} <Info href="/about/FAQ?question=q58" />
            </Text>
          </>
        )}
        {!isLarge && integrationOptions?.enableSearch && (
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
        {integrationOptions?.enableFilters && (
          <Col xs="12" sm="4" lg="2">
            <PublicationFilters />
          </Col>
        )}
      </Container>
      <Container className="fr-mt-4w">
        <Row>
          <Col xs="12" lg="8">
            <Container fluid>
              <Tabs
                className="fr-mb-4w"
                defaultActiveIndex={networkTabFindIndex(currentTab)}
                onTabChange={(index) => {
                  handleTabChange(networkTabFindLabel(index))
                  resetFocus()
                }}
              >
                {networkTabs
                  .filter(({ label }) => (!integrationOptions?.enableTabs ? label === currentTab : true))
                  .map(({ label, icon }) => (
                    <Tab index={label} label={intl.formatMessage({ id: `networks.header.tab.${label}` })} icon={icon}>
                      <Home currentTab={label} />
                      <Graph currentTab={label} computeClusters={computeClusters} focusItem={focusItem} />
                    </Tab>
                  ))}
              </Tabs>
              {isLarge && <ClustersSection currentTab={currentTab} enabled={computeClusters} setFocusItem={setFocusItem} />}
            </Container>
          </Col>
          <Col xs="12" lg="4">
            <Container fluid={!isLarge}>
              {isLarge && integrationOptions?.enableSearch && (
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
              {integrationOptions?.enableFilters && (
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
        {!isLarge && <ClustersSection currentTab={currentTab} enabled={computeClusters} setFocusItem={setFocusItem} />}
      </Container>
    </>
  )
}

export default function Networks() {
  const { integrationLang: locale } = useIntegration()
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
