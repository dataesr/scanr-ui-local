import { Button, Row, Title } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useSearchParams } from "react-router-dom"
import useUrl from "../../hooks/useUrl"

export default function NavigateToNetwork() {
  const intl = useIntl()
  const { api } = useUrl()
  const [searchParams] = useSearchParams();

  if (!["publications", "patents", "projects"].includes(api)) return null;

  searchParams.set("source", api)
  const url = `/networks?${searchParams.toString()}`


  return (
    <>
      <Row className="fr-mb-3w">
        <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
          {intl.formatMessage({ id: "search.navigate-to-network.label" })}
        </Title>
        <p className="fr-text--xs fr-text-mention--grey fr-mb-1w">
          {intl.formatMessage({ id: "search.navigate-to-network.desc" })}
        </p>
        <div style={{ display: 'flex', width: "100%", justifyContent: "flex-end" }}>
          <Button size="sm" as="a" variant="text" icon="arrow-right-line" iconPosition="right" href={url}>
            {intl.formatMessage({ id: "search.navigate-to-network.button" })}
          </Button>
        </div>
      </Row>
    </>
  )
}
