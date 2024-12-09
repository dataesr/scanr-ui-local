import { Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function NetworkParametersButton() {
  const { screen } = useScreenSize()

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="equalizer-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-parameters-modal"
      data-fr-opened="false"
      variant={"tertiary"}
    >
      {["xs", "sm", "mg"].includes(screen) ? "" : "Paramètres"}
    </Button>
  )
}
