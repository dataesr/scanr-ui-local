import { useIntl } from "react-intl"
import useIntegration from "../hooks/useIntegration"
import getBsoLocals from "../integration/config"
import { Container, Text, Title } from "@dataesr/dsfr-plus"
import IconLink from "../../../components/icon-link"

export default function NetworkTitle() {
  const intl = useIntl()
  const { integrationId, integrationOptions } = useIntegration()

  if (integrationOptions?.useTitle === false) return null

  const locals = integrationId ? getBsoLocals() : {}
  const comment: string =
    (intl.locale === "en" ? locals?.[integrationId]?.commentsNameEN : locals?.[integrationId]?.commentsName) ||
    (integrationId ? ` ${intl.formatMessage({ id: "networks.header.title.perimeter" })} ${integrationId}` : "")

  return (
    <Container fluid>
      <Title as="h3">
        {intl.formatMessage({ id: "networks.header.title" })}
        {comment}
      </Title>
      <Text as="p" size="lg">
        {intl.formatMessage({ id: "networks.header.subtitle" })}{" "}
        <IconLink
          href="/about/FAQ?question=q58"
          icon="question-line"
          title={intl.formatMessage({ id: "networks.header.subtitle-hover" })}
          target="_blank"
        />
      </Text>
    </Container>
  )
}
