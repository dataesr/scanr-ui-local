import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

type CpcChartProps = {
  data: {
    label: any;
    name: string;
    doc_count: number;
    code: string;
  }[];
};

const CpcChart: React.FC<CpcChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.doc_count,
    code: item.code,
  }));

  const options = {
    chart: {
      type: "packedbubble",
      layoutAlgorithm: {
        splitSeries: false,
      },
      height: "100%",
      backgroundColor: "#f4f4f4",
    },
    title: {
      text: "Répartition des CPC par code",
    },
    tooltip: {
      pointFormat: "<b>{point.name}</b> (Code: {point.code}): {point.value}",
      formatter: function () {
        return `<b>${this.point.name}</b> (Code: ${this.point.code}): ${this.point.value}`;
      },
    },
    series: [
      {
        minSize: 20,
        maxSize: 100,
        data: chartData.map((item) => ({
          name: item.name,
          value: item.value,
          code: item.code,
        })),
      },
    ],
    plotOptions: {
      packedbubble: {
        minSize: 10,
        maxSize: 100,
        zMin: 0,
        zMax: 100,
        dataLabels: {
          enabled: true,
          format: "{point.value}",
        },
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              window.location.href = `/search/patents?q=${this.code}`;
            },
          },
        },
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CpcChart;
