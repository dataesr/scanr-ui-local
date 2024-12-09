import { Button } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"

export default function TrendsSelectSourceButton() {
  const intl = useIntl()
  const { source } = useTrendsContext()

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon={source === "publications" ? "article-line" : "chat-3-line"}
      iconPosition="left"
      as="button"
      aria-controls="trends-options-select-source-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {intl.formatMessage({ id: `trends.select-source.${source}` })}
    </Button>
  )
}
