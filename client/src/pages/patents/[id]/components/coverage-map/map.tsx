// disable eslint for this file
/* eslint-disable */
// disable typescript for this file
// @ts-nocheck
import { useState, useId } from "react";
import customGeoJSON from "./custom.geo.json";
import { EP, EA, AP, WO } from "./map-utils";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  GeoJSON,
  Tooltip,
  FeatureGroup,
  Popup,
  Circle,
} from "react-leaflet";
import { useIntl } from "react-intl";
import "./styles.scss";
import MapLegend from "./map-legend";
import { PatentsData } from "../../../../../types/patent";

export type MapProps = {
  height?: string;
  stage: string;
  patents?: PatentsData[];
};

const CustomTooltip = ({ content, index }) => {
  return (
    <Tooltip direction="top" sticky>
      <div key={index}>{content}</div>
    </Tooltip>
  );
};

export default function Map({
  height = "550px",
  patents = [],
  stage = "application",
}: MapProps) {
  if (!patents?.length) return null;
  const intl = useIntl();
  const segmentId = useId();
  const iso2Codes = patents.map((patent) => patent.office);
  const getFillColor = (iso2Code) => {
    if (iso2Codes.includes(iso2Code)) return "#d64d00";
    if (iso2Codes.includes("EP") && EP.includes(iso2Code))
      return "var(--blue-ecume-main-400)";
    if (iso2Codes.includes("WO") && WO.includes(iso2Code))
      return "var(--pink-macaron-main-689)";
    if (iso2Codes.includes("EA") && EA.includes(iso2Code))
      return "var(--green-bourgeon-975)";
    if (iso2Codes.includes("AP") && AP.includes(iso2Code))
      return "var(--yellow-tournesol-main-731)";
    return "gray";
  };

  const getTooltipContent = (feature) => {
    const iso2Code = feature.properties.iso_a2;
    const date = `${stage}Date`;
    const regions = [
      ["EP", EP],
      ["EA", EA],
      ["AP", AP],
      ["WO", WO],
    ];

    let content = `${feature.properties.name}<br/>`;
    const hasNationalPatent = iso2Codes.includes(iso2Code);
    if (hasNationalPatent) {
      const nationalPatent = patents.find(
        (patent) => patent.office === iso2Code
      );
      const stageText =
        stage === "application"
          ? intl.formatMessage({ id: "patents.section.map.national.deposit" })
          : stage === "publication"
          ? intl.formatMessage({
              id: "patents.section.map.national.publication",
            })
          : stage === "granted"
          ? intl.formatMessage({ id: "patents.section.map.national.grant" })
          : "";
      const stageDate = nationalPatent?.[date]
        ? ` ${stageText}: ${new Date(
            nationalPatent[date]
          ).toLocaleDateString()} <br/>`
        : "";
      content += stageDate;
    }

    const isRegional = regions.find((el) => el[1].includes(iso2Code))?.[0];
    if (isRegional && !content.includes("Date de dépôt")) {
      const regionPatent = patents.find(
        (patent) => patent.office === isRegional
      );
      const regionalDate =
        (regionPatent?.[date] &&
          {
            application: `${intl.formatMessage({
              id: "patents.section.map.regional.deposit",
            })} ${new Date(regionPatent[date]).toLocaleDateString()}`,
            publication: `${intl.formatMessage({
              id: "patents.section.map.regional.publication",
            })} ${new Date(regionPatent[date]).toLocaleDateString()}`,
            granted: `${intl.formatMessage({
              id: "patents.section.map.regional.grant",
            })} ${new Date(regionPatent[date]).toLocaleDateString()}`,
          }[stage]) ||
        "";

      content += regionalDate;
    }

    return content;
  };

  return (
    <MapContainer
      center={[48.866667, 2.333333]}
      style={{
        borderRadius: ".5rem",
        height,
        backgroundColor: "var(--background-alt-grey",
      }}
      zoom={1.6}
      zoomSnap={0.1}
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
      dragging={false}
    >
      <GeoJSON
        key={stage}
        data={customGeoJSON}
        onEachFeature={(feature, layer) => {
          layer.bindTooltip(getTooltipContent(feature));
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
