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

export type MapProps = {
  height?: string;
  patents?: PatentsData[];
};

export default function Map({
  height = "550px",
  patents = [],
}: MapProps) {
  if (!patents?.length) return null;
  const intl = useIntl();
  const segmentId = useId();
  const iso2Codes = patents.map((patent) => patent.office);

  const getFillColor = (iso2Code) => {
    if (iso2Codes.includes(iso2Code)) return "#d64d00";
    if (iso2Codes.includes("EP") && EP.includes(iso2Code))
      return 'var(--blue-ecume-main-400)';
    if (iso2Codes.includes("WO") && WO.includes(iso2Code))
      return 'var(--pink-macaron-main-689)';
    if (iso2Codes.includes("EA") && EA.includes(iso2Code))
      return 'var(--green-bourgeon-975)';
    if (iso2Codes.includes("AP") && AP.includes(iso2Code))
      return 'var(--yellow-tournesol-main-731)';
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
    <MapContainer
      center={[48.866667, 2.333333]}
      style={{ borderRadius: ".5rem", height, backgroundColor: "var(--background-alt-grey" }}
      zoom={1.6}
      zoomSnap={0.1}
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
      dragging={false}
    >
      <GeoJSON
        data={customGeoJSON}
        onEachFeature={(feature, layer) => {
          const iso2Code = feature.properties.iso_a2;
          const tooltipContent = getTooltipContent(feature);
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
  );
}
