import { Container, Link, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

export default function StudioDefine() {
  const intl = useIntl()

  return (
    <Container>
      <Text>{intl.formatMessage({ id: "studio.define.text" })}</Text>
      <Link href="https://barometredelascienceouverte.esr.gouv.fr/declinaisons/bso-locaux" target="_blank">
        {intl.formatMessage({ id: "studio.define.link.bso-local" })}
      </Link>
      <br />
      <br />
      <Link href="https://barometredelascienceouverte.esr.gouv.fr/declinaisons/comment-realiser-bso-local" target="_blank">
        {intl.formatMessage({ id: "studio.define.link.bso-studio" })}
      </Link>
    </Container>
  )
}
