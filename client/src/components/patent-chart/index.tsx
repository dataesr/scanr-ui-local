import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { useIntl } from "react-intl";

HighchartsMore(Highcharts);

type CpcChartProps = {
  data: {
    label: string;
    doc_count: number;
    code: string;
  }[];
};

const sectionLabels: Record<string, string> = {
  A: "organizations.sectionLabels.humanNecessities",
  B: "organizations.sectionLabels.performingOperations",
  C: "organizations.sectionLabels.chemistryMetallurgy",
  D: "organizations.sectionLabels.textilesPaper",
  E: "organizations.sectionLabels.fixedConstructions",
  F: "organizations.sectionLabels.mechanicalEngineering",
  G: "organizations.sectionLabels.physics",
  H: "organizations.sectionLabels.electricity",
  Y: "organizations.sectionLabels.other",
};

const CpcChart: React.FC<CpcChartProps> = ({ data }) => {
  const intl = useIntl();
  const colorPalette = [
    "#7AB1E8",
    "#21AB8E",
    "#f6e157",
    "#CE70CC",
    "#FF9575",
    "#FFCA00",
    "#FF732C",
    "#E6BE92",
    "#AEA397",
  ];

  const groupedData = data.reduce((acc, item) => {
    const firstLetter = item.code.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push({
      name: item.code,
      value: item.doc_count,
      label: item.label,
    });
    return acc;
  }, {} as Record<string, { name: string; value: number; label: string }[]>);

  const seriesData = Object.entries(groupedData).map(
    ([letter, items], index) => ({
      name:
        intl.formatMessage({ id: sectionLabels[letter] }) ||
        `Section ${letter}`,
      color: colorPalette[index % colorPalette.length],
      data: items.map((item) => ({
        name: item.name,
        value: item.value,
        label: item.label,
      })),
    })
  );

  const values = seriesData.flatMap((series) =>
    series.data.map((point) => point.value)
  );
  const zMin = Math.min(...values);
  const zMax = Math.max(...values);

  const options = {
    chart: {
      type: "packedbubble",
      backgroundColor: "#f4f4f4",
      height: "100%",
    },
    title: {
      text: intl.formatMessage({ id: "organizations.patents.chart.title" }),
    },
    tooltip: {
      formatter: function () {
        const familiesText = intl.formatMessage(
          {
            id: "organizations.patents.chart.families",
            defaultMessage: "{value} famille{plural}",
          },
          {
            value: this.point.value,
            plural: this.point.value > 1 ? "s" : "",
          }
        );
        return `<b>${this.point.name}</b> - <b>${this.point.label}</b>: ${familiesText}`;
      },
    },

    plotOptions: {
      packedbubble: {
        minSize: "45%",
        maxSize: "120%",
        zMin: zMin,
        zMax: zMax,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          parentNodeLimit: true,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: seriesData,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default CpcChart;
