import { useIntl } from "react-intl"
import { Container, Row, Col, Title } from "@dataesr/dsfr-plus"
import useUrl from "../hooks/useUrl"

export default function Home({ currentTab }: { currentTab: string }) {
  const intl = useIntl()
  const { currentQuery } = useUrl()

  if (currentQuery !== null) return <></>

  return (
    <Container className="fr-mt-5w" style={{ height: "200px" }}>
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
