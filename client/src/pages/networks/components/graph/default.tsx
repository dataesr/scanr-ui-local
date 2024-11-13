import { useIntl } from "react-intl"
import { Container, Row, Col, Title } from "@dataesr/dsfr-plus"
import useTab from "../../hooks/useTab"

export default function NetworkGraphDefault() {
  const { currentTab } = useTab()
  const intl = useIntl()

  return (
    <Container>
      <Row>
        <Col xs="12" md="8">
          <Title as="h3" look="h5">
            {intl.formatMessage({ id: `networks.home.title.${currentTab}` })}
          </Title>
        </Col>
        <Col xs="12" offsetXs="4" md="3" offsetMd="1">
          <svg className="fr-artwork" aria-hidden="true" viewBox="0 0 80 80" width="150px" height="auto">
            <use
              className="fr-artwork-decorative"
              href="/artwork/pictograms/digital/data-visualization.svg#artwork-decorative"
            />
            <use className="fr-artwork-minor" href="/artwork/pictograms/digital/data-visualization.svg#artwork-minor" />
            <use className="fr-artwork-major" href="/artwork/pictograms/digital/data-visualization.svg#artwork-major" />
          </svg>
        </Col>
      </Row>
    </Container>
  )
}
