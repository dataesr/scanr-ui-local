import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import { Select, SelectOption } from "@dataesr/dsfr-plus"

export default function NetworkSelectSource() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showSelectSource === false) return null

  return (
    <Select
      label={intl.formatMessage({ id: "networks.select-source.label" })}
      selectedKey={"publications"}
      disabledKeys={["patents"]}
      onSelectionChange={() => {}}
    >
      <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />} key={"publications"}>
        {intl.formatMessage({ id: "networks.select-source.publications" })}
      </SelectOption>
      <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-award-line`} />} key={"patents"}>
        {intl.formatMessage({ id: "networks.select-source.patents" })}
      </SelectOption>
    </Select>
  )
}
