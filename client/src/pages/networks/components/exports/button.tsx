import { MenuButton, MenuItem } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useTab from "../../hooks/useTab"
import useSearchData from "../../hooks/useSearchData"
import useExportData from "../../hooks/useExportData"
import useIntegration from "../../hooks/useIntegration"

export default function NetworkExportsButton() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { integrationOptions } = useIntegration()
  const { search, currentQuery } = useSearchData(currentTab)
  const { isExporting, exportFile } = useExportData()

  if (integrationOptions?.showExports === false) return null

  const handleExport = async (key: string) => {
    const format = key.split(">")[1] as "json" | "xlsx"
    await exportFile(format)
  }

  return (
    <MenuButton
      disabledKeys={
        isExporting || search.isFetching || Boolean(search.error) || !currentQuery ? ["export>json", "export>xlsx"] : []
      }
      label={
        isExporting
          ? intl.formatMessage({ id: "networks.exports.is-exporting" })
          : intl.formatMessage({ id: "networks.exports.title" })
      }
      size="md"
      placement="end"
      aria-label="Options"
      variant="text"
      iconPosition="right"
      icon="download-line"
      onAction={handleExport}
      className="fr-mb-1w"
    >
      <MenuItem
        key="export>json"
        className="fr-p-1w"
        description={intl.formatMessage({ id: "networks.exports.json.description" })}
        endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
      >
        <span className="fr-text--sm">{intl.formatMessage({ id: "networks.exports.json.title" })}</span>
      </MenuItem>
      <MenuItem
        key="export>xlsx"
        className="fr-p-1w"
        description={intl.formatMessage({ id: "networks.exports.xlsx.description" })}
        endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
      >
        <span className="fr-text--sm">{intl.formatMessage({ id: "networks.exports.xlsx.title" })}</span>
      </MenuItem>
    </MenuButton>
  )
}
