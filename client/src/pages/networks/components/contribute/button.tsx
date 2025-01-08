import { Button, Container } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function ContributeButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const search = window.location.search?.slice(1) || "q=*"

  console.log(screen)

  return (
    <Container fluid>
      <Button
        className="fr-ml-2w fr-pr-3w"
        as="a"
        href={`/bugs/networks/${search}`}
        color="error"
        variant="tertiary"
        icon="bug-line"
        iconPosition="left"
      >
        {["xs", "sm"].includes(screen)
          ? null
          : intl.formatMessage({
              id: "networks.contribute.button",
            })}
      </Button>
    </Container>
  )
}
