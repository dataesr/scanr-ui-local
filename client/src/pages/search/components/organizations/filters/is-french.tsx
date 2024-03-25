import { Text } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import useUrl from "../../../hooks/useUrl";

export default function OrganizationsIsFrenchFilter() {
  const intl = useIntl();
  const { handleBoolFilterChange, handleDeleteFilter, currentFilters } =
    useUrl();
  const segmentId = "is-french-selector";
  const isFrench = currentFilters?.isFrench?.values?.[0]?.value;

  return (
    <>
      <Text bold size="md">
        {intl.formatMessage({
          id: "search.filters.organizations.is-french.title",
        })}
      </Text>
      <fieldset
        aria-label={intl.formatMessage({
          id: "search.filters.organizations.is-french.title",
        })}
        id="organizations-is-french-filter"
        className="fr-segmented fr-segmented--lg"
      >
        <div className="fr-segmented__elements">
          <div className="fr-segmented__element">
            <input
              checked={isFrench === undefined}
              onClick={() => {
                handleDeleteFilter({ field: "isFrench" });
              }}
              type="radio"
              id={`${segmentId}-all`}
            />
            <label className="fr-label" htmlFor={`${segmentId}-all`}>
              {intl.formatMessage({
                id: "search.filters.organizations.is-french.all",
              })}
            </label>
          </div>
          <div className="fr-segmented__element">
            <input
              checked={isFrench === "true"}
              onClick={() => {
                handleBoolFilterChange({
                  field: "isFrench",
                  value: true,
                  label: "Française uniquement",
                  forceValue: true,
                });
              }}
              type="radio"
              id={`${segmentId}-year`}
            />
            <label className="fr-label" htmlFor={`${segmentId}-year`}>
              {intl.formatMessage({
                id: "search.filters.organizations.is-french.french",
              })}
            </label>
          </div>
          <div className="fr-segmented__element">
            <input
              checked={isFrench === "false"}
              onClick={() => {
                handleBoolFilterChange({
                  field: "isFrench",
                  value: false,
                  label: "Etrangères uniquement",
                  forceValue: true,
                });
              }}
              type="radio"
              id={`${segmentId}-foreign`}
            />
            <label className="fr-label" htmlFor={`${segmentId}-foreign`}>
              {intl.formatMessage({
                id: "search.filters.organizations.is-french.foreign",
              })}
            </label>
          </div>
        </div>
      </fieldset>
    </>
  );
}
