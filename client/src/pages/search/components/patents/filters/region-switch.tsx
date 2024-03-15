import { Text, Toggle } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function PatentRegionFilter() {
  const intl = useIntl();
  const { handleFilterChange } = useUrl();

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        <FormattedMessage id="search.filters.patents.regions" />
      </Text>
      <Toggle
        onClick={() =>
          handleFilterChange({
            field: "isInternational",
            value: true,
            filterType: "bool",
          })
        }
        label={intl.formatMessage({
          id: "search.filters.patents.WO",
        })}
      />
      <Toggle
        onClick={() =>
          handleFilterChange({
            field: "isOeb",
            value: true,
            filterType: "bool",
          })
        }
        label={intl.formatMessage({
          id: "search.filters.patents.EP",
        })}
      />
      <Toggle
        onClick={() =>
          handleFilterChange({
            field: "isGranted",
            value: true,
            filterType: "bool",
          })
        }
        label="Les brevets protégés uniquement"
      />
    </>
  );
}
