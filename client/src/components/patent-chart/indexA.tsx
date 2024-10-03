import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import wordcloud from "highcharts/modules/wordcloud";

wordcloud(Highcharts);

type CpcWordChartProps = {
  data: {
    label: string;
    doc_count: number;
    code: string;
  }[];
};

const CpcWordCloud: React.FC<CpcWordChartProps> = ({ data }) => {
  const wordCloudData = data.map((item) => ({
    name: item.code,
    weight: item.doc_count,
    label: item.label,
  }));

  const options = {
    chart: {
      type: "wordcloud",
    },
    title: {
      text: "Nuage de mots des CPC par code",
    },
    series: [
      {
        type: "wordcloud",
        data: wordCloudData,
        name: "Occurrences",
      },
    ],
    tooltip: {
      pointFormat:
        "{point.label}: <b>{point.name}</b> (Occurrences: {point.weight})",
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              window.location.href = `/search/patents?q=${this.name}`;
            },
          },
        },
      },
      wordcloud: {
        minFontSize: 10,
        maxFontSize: 50,
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CpcWordCloud;
