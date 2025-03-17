import { Button, ButtonGroup } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function ContributeButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const search = window.location.search?.slice(1) || "q=*"

  return (
    <ButtonGroup size={["xs", "sm"].includes(screen) ? "sm" : "md"} className="fr-ml-1w">
      <Button
        className="fr-pr-3w"
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
    </ButtonGroup>
  )
}
