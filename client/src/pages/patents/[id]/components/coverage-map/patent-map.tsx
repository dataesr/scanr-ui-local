// disable eslint for this file
/* eslint-disable */
// disable typescript for this file
// @ts-nocheck
import { useState, useId } from "react";
import customGeoJSON from "./custom.geo.json";
import { EP, EA, AP, WO } from "./map-utils";

import "leaflet/dist/leaflet.css";
import { MapContainer, GeoJSON } from "react-leaflet";
import { useIntl } from "react-intl";
import './styles.scss';
import MapLegend from "./map-legend";
import { PatentsData } from "../../../../../types/patent";

export type MapMarkers = {
  latLng: number[];
  address: string;
  color?: string;
  label?: string;
  zIndexOffset?: number;
};

export type SetMapProps = {
  markers: MapMarkers[];
};

export type MapProps = {
  height?: string;
  width?: string;
  zoom?: number;
  patents?: PatentsData[];
};

const colorMap = {
  france: "#000091",
  "pink-macaron-main-689": "#E18B76",
  "blue-ecume-main-400": "#465F9D",
  "green-bourgeon-975": "#e6feda",
  "yellow-tournesol-main-731": "#C8AA39",
};



export default function PatentMap({
  height = "500px",
  patents = []
}: MapProps) {
  if (!patents?.length) return null;
  const intl = useIntl();
  const [stage, setStage] = useState("application");
  const segmentId = useId();
  const iso2Codes = patents
    ?.filter((patent) => {
      if (stage === "application") return patent.applicationDate;
      if (stage === "publication") return patent.publicationDate;
      if (stage === "grant") return patent.grantedDate;
      return false;
    })
    ?.map((patent) => patent.office);

  const getFillColor = (iso2Code) => {
    const colorMapping = {
      FR: colorMap.france,
      WO: colorMap["pink-macaron-main-689"],
      EP: colorMap["blue-ecume-main-400"],
      EA: colorMap["green-bourgeon-975"],
      AP: colorMap["yellow-tournesol-main-731"],
    };

    if (iso2Codes.includes("FR")) return colorMapping.FR;
    if (iso2Codes.includes(iso2Code)) return "#d64d00";
    if (iso2Codes.includes("EP") && EP.includes(iso2Code))
      return colorMapping.EP;
    if (iso2Codes.includes("WO") && WO.includes(iso2Code))
      return colorMapping.WO;
    if (iso2Codes.includes("EA") && EA.includes(iso2Code))
      return colorMapping.EA;
    if (iso2Codes.includes("AP") && AP.includes(iso2Code))
      return colorMapping.AP;
    return "gray";
  };
  const getTooltipContent = (feature) => {
    const iso2Code = feature.properties.iso_a2;
    const isEP = iso2Codes.includes("EP") && EP.includes(iso2Code);
    const isWO = iso2Codes.includes("WO") && WO.includes(iso2Code);
    const isEA = iso2Codes.includes("EA") && EA.includes(iso2Code);
    const isAP = iso2Codes.includes("AP") && AP.includes(iso2Code);
    const isNational = iso2Codes.includes(iso2Code);

    return `
      <div>
        <strong>${feature.properties.name}</strong>
        <br />
        ${isEP && "EP"}
        ${isWO && "WO"}
        ${isEA && "EA"}
        ${isAP && "AP"}
        ${isNational && "National"}
      </div>
    `;
  };

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
      <MapContainer
        center={[48.866667, 2.333333]}
        style={{ borderRadius: ".5rem", height, backgroundColor: "var(--background-alt-grey" }}
        zoom={1.6}
        zoomSnap={0.1}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
        zIndexOffset={10}
      >
        <GeoJSON
          data={customGeoJSON}
          onEachFeature={(feature, layer) => {
            const iso2Code = feature.properties.iso_a2;
            const tooltipContent = getTooltipContent(feature);
            console.log(tooltipContent, iso2Code);

            layer.bindTooltip(tooltipContent, {
              direction: "top",
              sticky: true,
            });
          }}
          style={(feature: any) => {
            const iso2Code = feature.properties.iso_a2;
            const fillColor = getFillColor(iso2Code);
            return {
              fillColor,
              weight: 1,
              opacity: 1,
              color: "white",
              fillOpacity: 0.7,
            };
          }}
        />
      </MapContainer>
      <MapLegend />
    </>
  );
}
