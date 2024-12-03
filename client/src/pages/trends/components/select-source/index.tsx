import { Select, SelectOption } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"

export default function TrendsSelectSource() {
  const intl = useIntl()
  const { source, setSource } = useTrendsContext()

  return (
    <Select
      label={intl.formatMessage({ id: "trends.select-source.label" })}
      selectedKey={source}
      // disabledKeys={["citations"]}
      onSelectionChange={(value) => {
        setSource(value)
      }}
    >
      <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />} key={"publications"}>
        {intl.formatMessage({ id: "trends.select-source.publications" })}
      </SelectOption>
      <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-chat-3-line`} />} key={"citations"}>
        {intl.formatMessage({ id: "trends.select-source.citations" })}
      </SelectOption>
    </Select>
  )
}
