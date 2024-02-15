import Highcharts from "highcharts";
import exportingModule from "highcharts/modules/exporting";
import exportingDataModule from "highcharts/modules/export-data";

if (typeof Highcharts === 'object') {
  exportingModule(Highcharts);
  exportingDataModule(Highcharts);
}

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'Marianne',
    },
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
  },
  credits: {
    enabled: false
  },
  title: { text: null },
  lang: {
    accessibility: {
      defaultChartTitle: "Chart"
    }
  },
  exporting: {
    enabled: false,
    chartOptions: {
      chart: { height: '100%' },
      credits: {
        enabled: true,
        text: "Source : scanR, Moteur de la Recherche et de l'Innovation",
      },
    }
    }
});

export default Highcharts;