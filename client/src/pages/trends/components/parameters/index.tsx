import { Accordion } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import ToggleNormalize from "./toggle-normalize"

export default function TrendsParameters() {
  const intl = useIntl()

  return (
    <Accordion title={intl.formatMessage({ id: "trends.parameters.title" })} className="fr-mb-2w">
      <ToggleNormalize />
    </Accordion>
  )
}
