
import { useState, useId } from "react";
import "leaflet/dist/leaflet.css";
import { useIntl } from "react-intl";
import { PatentsData } from "../../../../../types/patent";
import Map from "./map";
import MapLegend from "./map-legend";

import './styles.scss';


export default function PatentsMap({ patents = [] }: { patents: PatentsData[] }) {
  const intl = useIntl();
  const [stage, setStage] = useState("application");
  const segmentId = useId();
  if (!patents?.length) return null;

  const _patents = patents.filter((patent) => {
    if (stage === "application") return patent.applicationDate;
    if (stage === "publication") return patent.publicationDate;
    if (stage === "grant") return patent.grantedDate;
  });

  return (
    <>
      <fieldset id="map-selector" className="fr-segmented fr-segmented--sm fr-mb-3w">
        <legend className="fr-segmented__legend">
          {intl.formatMessage({ id: "patents.section.map.fieldset.legend" })}
        </legend>
        <div className="fr-segmented__elements">
          <div className="fr-segmented__element">
            <input
              checked={(stage === "application")}
              onClick={() => setStage("application")}
              type="radio"
              id={`${segmentId}-application`}
            />
            <label
              className="fr-label"
              htmlFor={`${segmentId}-application`}
            >
              {intl.formatMessage({ id: "patents.section.map.fieldset.application" })}
            </label>
          </div>
          <div className="fr-segmented__element">
            <input
              checked={(stage === "publication")}
              onClick={() => setStage("publication")}
              type="radio"
              disabled={!patents.some((patent) => patent.publicationDate)}
              id={`${segmentId}-publication`}
            />
            <label
              className="fr-label"
              htmlFor={`${segmentId}-publication`}
            >
              {intl.formatMessage({ id: "patents.section.map.fieldset.publication" })}
            </label>
          </div>
          <div className="fr-segmented__element">
            <input
              checked={(stage === "grant")}
              onClick={() => setStage("grant")}
              type="radio"
              disabled={!patents.some((patent) => patent.grantedDate)}
              id={`${segmentId}-grant`}
            />
            <label
              className="fr-label"
              htmlFor={`${segmentId}-grant`}
            >
              {intl.formatMessage({ id: "patents.section.map.fieldset.grant" })}
            </label>
          </div>
        </div>
      </fieldset>
      <Map patents={_patents} />
      <MapLegend />
    </>
  );
}
