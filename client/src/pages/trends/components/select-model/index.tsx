import { Select, SelectOption } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

export default function TrendsSelectModel() {
  const intl = useIntl()

  return (
    <Select
      label={intl.formatMessage({ id: "trends.select-model.label" })}
      selectedKey={"domains"}
      disabledKeys={["authors"]}
      onSelectionChange={() => {}}
    >
      <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />} key={"domains"}>
        {intl.formatMessage({ id: "trends.select-model.domains" })}
      </SelectOption>
      <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-user-line`} />} key={"authors"}>
        {intl.formatMessage({ id: "trends.select-model.authors" })}
      </SelectOption>
    </Select>
  )
}
