import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import { Select, SelectOption } from "@dataesr/dsfr-plus"

export default function NetworkSelectSource() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showSelect === false) return null

  return (
    <Select
      label={intl.formatMessage({ id: "networks.select-source.label" })}
      selectedKey={"publications"}
      onSelectionChange={() => {}}
    >
      <SelectOption startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-profil-line`} />} key={"publications"}>
        {"Publications"}
      </SelectOption>
    </Select>
  )
}
