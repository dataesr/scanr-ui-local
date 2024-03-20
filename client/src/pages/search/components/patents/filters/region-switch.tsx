import { Text, Toggle } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function PatentRegionFilter() {
  const intl = useIntl();
  const { handleBoolFilterChange, currentFilters } = useUrl();

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        <FormattedMessage id="search.filters.patents.regions" />
      </Text>
      <Toggle
        label={intl.formatMessage({
          id: "search.filters.patents.WO",
        })}
        checked={!!currentFilters.isInternational?.values?.[0]?.value}
        onChange={(e) =>
          handleBoolFilterChange({
            field: "isInternational",
            value: e.target.checked,
            label: "Brevets internationaux seulement",
          })
        }
      />

      <Toggle
        label={intl.formatMessage({
          id: "search.filters.patents.EP",
        })}
        checked={!!currentFilters.isOeb?.values?.[0]?.value}
        onChange={(e) =>
          handleBoolFilterChange({
            field: "isOeb",
            value: e.target.checked,
            label: "Brevets européens seulement",
          })
        }
      />
      <Toggle
        checked={!!currentFilters.isGranted?.values?.[0]?.value}
        onClick={() =>
          handleBoolFilterChange({
            field: "isGranted",
            value: true,
            label: "Les brevets protégés uniquement",
          })
        }
        label="Les brevets protégés uniquement"
      />
    </>
  );
}
