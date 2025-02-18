import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import { getBsoLocals } from "../../integration/config"
import { Container, Title } from "@dataesr/dsfr-plus"
import useOptions from "../../hooks/useOptions"

export default function NetworkTitle() {
  const intl = useIntl()
  const { integrationId, integrationOptions } = useIntegration()
  const { currentSource } = useOptions()
  const { showTitle } = integrationOptions

  if (showTitle === false) return null

  const locals = integrationId ? getBsoLocals() : {}
  const comment: string =
    (intl.locale === "en" ? locals?.[integrationId]?.commentsNameEN : locals?.[integrationId]?.commentsName) ||
    (integrationId ? `${intl.formatMessage({ id: "networks.header.title.perimeter" })} ${integrationId}` : "")

  return (
    <Container fluid className="fr-mb-2w">
      {showTitle && (
        <Title as="h4" className="fr-mb-1w">
          {intl.formatMessage(
            { id: "networks.header.title" },
            { source: intl.formatMessage({ id: `networks.source.${currentSource}` }).toLowerCase() }
          )}{" "}
          {comment}
        </Title>
      )}
    </Container>
  )
}
