import { useState, useId } from "react";
import "leaflet/dist/leaflet.css";
import { useIntl } from "react-intl";
import { PatentsData } from "../../../../../types/patent";
import Map from "./map";
import MapLegend from "./map-legend";

import "./styles.scss";

export default function PatentsMap({
  patents = [],
}: {
  patents: PatentsData[];
}) {
  const intl = useIntl();
  const [stage, setStage] = useState("application");
  const segmentId = useId();
  if (!patents?.length) return null;

  const _patents = patents.filter((patent) => {
    if (stage === "application") return patent.applicationDate;
    if (stage === "publication") return patent.publicationDate;
    if (stage === "granted") return patent.grantedDate;
  });

  return (
    <>
      <fieldset
        id="map-selector"
        className="fr-segmented fr-segmented--sm fr-mb-3w"
      >
        <legend className="fr-segmented__legend">
          {intl.formatMessage({ id: "patents.section.map.fieldset.legend" })}
        </legend>
        <div className="fr-segmented__elements">
          <div className="fr-segmented__element">
            <input
              checked={stage === "application"}
              onClick={() => setStage("application")}
              type="radio"
              id={`${segmentId}-application`}
            />
            <label className="fr-label" htmlFor={`${segmentId}-application`}>
              {intl.formatMessage({
                id: "patents.section.map.fieldset.application",
              })}
            </label>
          </div>
          <div className="fr-segmented__element">
            <input
              checked={stage === "publication"}
              onClick={() => setStage("publication")}
              type="radio"
              disabled={!patents.some((patent) => patent.publicationDate)}
              id={`${segmentId}-publication`}
            />
            <label className="fr-label" htmlFor={`${segmentId}-publication`}>
              {intl.formatMessage({
                id: "patents.section.map.fieldset.publication",
              })}
            </label>
          </div>
          <div className="fr-segmented__element">
            <input
              checked={stage === "granted"}
              onClick={() => setStage("granted")}
              type="radio"
              disabled={!patents.some((patent) => patent.grantedDate)}
              id={`${segmentId}-granted`}
            />
            <label className="fr-label" htmlFor={`${segmentId}-granted`}>
              {intl.formatMessage({
                id: "patents.section.map.fieldset.granted",
              })}
            </label>
          </div>
        </div>
      </fieldset>

      <Map patents={_patents} stage={stage} />
      <MapLegend />
    </>
  );
}
