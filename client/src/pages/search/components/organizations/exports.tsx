import { Row, Title, MenuButton, MenuItem } from "@dataesr/dsfr-plus";
import useSearchData from "../../hooks/useSearchData";
import { useIntl } from "react-intl";

export default function OrganizationsExports() {
  const intl = useIntl();
  const { total } = useSearchData();

  const handleExport = async (format: string) => {
    if (format === 'export>json') return alert('Exporting JSON');
    if (format === 'export>csv') return alert('Exporting CSV');
  }

  return (
    <Row>
      <div className="fr-mb-3w" style={{ display: "flex", alignItems: (total > 1000) ? "start" : "center", width: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
            {intl.formatMessage({ id: "search.exports.title" })}
          </Title>
          {(total > 1000) && (
            <p className="fr-text--xs fr-text-mention--grey">
              {intl.formatMessage({ id: "search.exports.description" })}
            </p>
          )}
        </div>
        <MenuButton className="fr-ml-2w" isDisabled placement="end" size="sm" aria-label="Options" variant="text" icon="settings-5-line" onAction={handleExport}>
          <MenuItem
            key="export>json"
            className="fr-p-1v"
            description={intl.formatMessage({ id: "search.exports.json.description" })}
            endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-1w" />}
          >
            <span className="fr-text--sm">
              {intl.formatMessage({ id: "search.exports.json.title" })}
            </span>
          </MenuItem>
          <MenuItem
            key="export>csv"
            className="fr-p-1v"
            description={intl.formatMessage({ id: "search.exports.csv.description" })}
            endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-1w" />}
          >
            <span className="fr-text--sm">
              {intl.formatMessage({ id: "search.exports.csv.title" })}
            </span>
          </MenuItem>
        </MenuButton>
      </div>
    </Row>
  );
}