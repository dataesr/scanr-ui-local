import { Button } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"

export default function TrendsSelectModelButton() {
  const intl = useIntl()
  const { model } = useTrendsContext()

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon={"book-2-line"}
      iconPosition="left"
      as="button"
      aria-controls="trends-options-select-model-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {intl.formatMessage({ id: `trends.select-model.${model}` })}
    </Button>
  )
}
