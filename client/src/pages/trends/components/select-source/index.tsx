import { SegmentedControl, SegmentedElement } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"

export default function TrendsSelectSource() {
  const intl = useIntl()
  const { source, setSource } = useTrendsContext()

  return (
    <SegmentedControl
      className="fr-mb-2w"
      name="select-source"
      label={intl.formatMessage({ id: "trends.select-source.label" })}
      onChangeValue={(value) => setSource(value)}
    >
      <SegmentedElement
        value="publications"
        checked={source === "publications"}
        label={intl.formatMessage({ id: "trends.select-source.publications" })}
        icon="fr-icon-article-line"
      />
      <SegmentedElement
        value="citations"
        checked={source === "citations"}
        label={intl.formatMessage({ id: "trends.select-source.citations" })}
        icon="fr-icon-chat-3-line"
      />
    </SegmentedControl>
  )
}
