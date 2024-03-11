import { Text, Toggle } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function PatentRegionFilter() {
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
            label: "Les brevets internationaux",
          })
        }
        label="Les brevets internationaux"
      />
      <Toggle
        onClick={() =>
          handleFilterChange({
            field: "isOeb",
            value: true,
            filterType: "bool",
            label: "Les brevets de l'Office européen des brevets",
          })
        }
        label="Les brevets de l'Office européen des brevets"
      />
    </>
  );
}
