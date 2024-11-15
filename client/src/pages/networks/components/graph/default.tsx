import { useIntl } from "react-intl"
import { Container, Row, Col, Title } from "@dataesr/dsfr-plus"
import useTab from "../../hooks/useTab"

export default function NetworkGraphDefault() {
  const { currentTab } = useTab()
  const intl = useIntl()

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col sm="8" style={{ display: "flex", alignItems: "center" }}>
          <Title as="h3" look="h5">
            {intl.formatMessage(
              { id: "networks.home.title" },
              { tab: intl.formatMessage({ id: `networks.tab.of.${currentTab}` }) }
            )}
          </Title>
        </Col>
        <svg className="fr-artwork" aria-hidden="true" viewBox="0 0 80 80" width="150px" height="auto">
          <use className="fr-artwork-minor" href="/artwork/pictograms/digital/data-visualization.svg#artwork-minor" />
          <use className="fr-artwork-major" href="/artwork/pictograms/digital/data-visualization.svg#artwork-major" />
        </svg>
      </Row>
    </Container>
  )
}
