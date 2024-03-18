import { Text, Toggle } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function PatentRegionFilter() {
  const intl = useIntl();
  const { handleFilterChange, currentFilters } = useUrl();

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        <FormattedMessage id="search.filters.patents.regions" />
      </Text>
      <Toggle
        className="fr-mb-2w"
        label={intl.formatMessage({
          id: "search.filters.patents.WO",
        })}
        value={currentFilters.isInternational?.values?.[0]?.value}
        onChange={(e) =>
          handleFilterChange({
            field: "isInternational",
            value: e.target.checked,
            filterType: "bool",
            label: "Brevets internationaux seulement",
          })
        }
      />

      <Toggle
        className="fr-mb-2w"
        label={intl.formatMessage({
          id: "search.filters.patents.EP",
        })}
        value={currentFilters.isOeb?.values?.[0]?.value}
        onChange={(e) =>
          handleFilterChange({
            field: "isOeb",
            value: e.target.checked,
            filterType: "bool",
            label: "Brevets européens seulement",
          })
        }
      />
      <Toggle
        onClick={() =>
          handleFilterChange({
            field: "isGranted",
            value: true,
            filterType: "bool",
            label: "Les brevets protégés uniquement",
          })
        }
        label="Les brevets protégés uniquement"
      />
    </>
  );
}
