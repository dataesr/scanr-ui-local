import { Container, Link, Text } from "@dataesr/dsfr-plus"

export default function StudioDefine() {
  return (
    <Container>
      <Text>
        {"Les déclinaisons locales de scanR utilisent le système de déclinaison du Baromètre de la Science Ouverte."}
      </Text>
      <Link href="https://barometredelascienceouverte.esr.gouv.fr/declinaisons/bso-locaux" target="_blank">
        {"Voir les déclinaisons locales du Baromètre de la Science Ouverte"}
      </Link>
      <br />
      <br />
      <Link href="https://barometredelascienceouverte.esr.gouv.fr/declinaisons/comment-realiser-bso-local" target="_blank">
        {"Pour soumettre une demande de déclinaison locale"}
      </Link>
    </Container>
  )
}
