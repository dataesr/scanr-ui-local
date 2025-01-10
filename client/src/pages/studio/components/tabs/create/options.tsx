import { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { Accordion, Container, Row, Toggle } from "@dataesr/dsfr-plus"
import useNetworksIntegration from "../../../../networks/hooks/useIntegration"
import useTrendsIntegration from "../../../../trends/hooks/useIntegration"

const integrationMapping = {
  networks: useNetworksIntegration,
  trends: useTrendsIntegration,
}

type StudioCreateOptionsArgs = {
  tool: string
  setOptions: React.Dispatch<React.SetStateAction<string>>
}
export default function StudioCreateOptions({ tool, setOptions }: StudioCreateOptionsArgs) {
  const intl = useIntl()
  const integrationOptions = {
    ...integrationMapping[tool]()?.integrationOptions,
    ...(tool === "networks" && { clusters: false }),
  }
  const [integration, setIntegration] = useState(integrationOptions)

  const noOptions = tool === "networks" ? "showGraphOnly" : "showTrendsOnly"

  useEffect(() =>
    setOptions(
      Object.entries(integration)
        .filter(([key]) => !["showBreadcrumb", "showTitle"].includes(key))
        .map(([key, value]) => `&${key}=${value}`)
        .join("")
    )
  )

  const setOption = (key: string, value: boolean) => setIntegration((prev) => ({ ...prev, [key]: value }))

  return (
    <Accordion className="fr-mb-2w" title={intl.formatMessage({ id: "studio.create.options.label" })}>
      <Toggle
        label={intl.formatMessage({
          id: `studio.options.${tool}.${noOptions}`,
        })}
        checked={integration?.[noOptions]}
        onChange={(event) => setOption(noOptions, event.target.checked)}
      />
      <hr />
      <Toggle
        label={intl.formatMessage({
          id: `studio.options.${tool}.showHeader`,
        })}
        checked={integration?.showHeader}
        onChange={(event) => setOption("showHeader", event.target.checked)}
        disabled={integration?.[noOptions]}
      />
      <hr />
      <Toggle
        label={intl.formatMessage({
          id: `studio.options.${tool}.showOptionsBar`,
        })}
        checked={integration?.showOptionsBar}
        onChange={(event) => setOption("showOptionsBar", event.target.checked)}
        disabled={integration?.[noOptions]}
      />
      <Row horizontalAlign="left">
        {Object.entries(integration)
          .filter(([key]) =>
            [
              "showSearchBar",
              "showSelectModel",
              "showSelectSource",
              "showFilters",
              "showParameters",
              "showExports",
            ].includes(key)
          )
          .map(([key, value]) => (
            <Container fluid key={key} style={{ width: "300px" }}>
              <Toggle
                key={key}
                label={intl.formatMessage({ id: `studio.options.${tool}.${key}` })}
                checked={value as boolean}
                onChange={(event) => setOption(key, event.target.checked)}
                disabled={integration?.[noOptions] || !integration?.showOptionsBar}
              />
            </Container>
          ))}
      </Row>
      {tool === "networks" && (
        <Container fluid>
          <hr />
          <Row horizontalAlign="left">
            <Container fluid style={{ width: "300px" }}>
              <Toggle
                label={intl.formatMessage({ id: `studio.options.networks.forceClusters` })}
                checked={integration?.clusters}
                onChange={(event) => setOption("clusters", event.target.checked)}
                disabled={integration?.[noOptions]}
              />
            </Container>
            {Object.entries(integration)
              .filter(([key]) => ["showClustersButton", "showClustersAnalytics"].includes(key))
              .map(([key, value]) => (
                <Container fluid key={key} style={{ width: "300px" }}>
                  <Toggle
                    key={key}
                    label={intl.formatMessage({ id: `studio.options.networks.${key}` })}
                    checked={value as boolean}
                    onChange={(event) => setOption(key, event.target.checked)}
                    disabled={integration?.[noOptions]}
                  />
                </Container>
              ))}
          </Row>
        </Container>
      )}
    </Accordion>
  )
}
