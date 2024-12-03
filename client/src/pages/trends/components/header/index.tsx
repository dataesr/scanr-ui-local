import { Breadcrumb, Container, Link, Title } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

function TrendsBreadcrum() {
  const intl = useIntl()

  return (
    <Breadcrumb className="fr-mt-0 fr-mb-2w">
      <Link href="/">{intl.formatMessage({ id: "trends.header.breadcrumb.home" })}</Link>
      <Link current>{intl.formatMessage({ id: "trends.header.breadcrumb.analyze" })}</Link>
    </Breadcrumb>
  )
}

function TrendsTitle() {
  const intl = useIntl()

  return (
    <Container fluid className="fr-mb-2w">
      <Title as="h4" className="fr-mb-1w">
        {intl.formatMessage({ id: "trends.header.title" })}
      </Title>
    </Container>
  )
}

export default function TrendsHeader() {
  return (
    <Container className="bg-trends fr-mb-2w" fluid>
      <Container className="fr-pt-4w fr-pb-1v">
        <TrendsBreadcrum />
        <TrendsTitle />
      </Container>
    </Container>
  )
}
