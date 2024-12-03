import { Select, SelectOption } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

export default function TrendsSelectSource() {
  const intl = useIntl()

  return (
    <Select
      label={intl.formatMessage({ id: "trends.select-source.label" })}
      selectedKey={"publications"}
      disabledKeys={["citations"]}
      onSelectionChange={() => {}}
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
