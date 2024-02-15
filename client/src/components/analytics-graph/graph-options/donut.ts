import { colors as defaultColors } from "../utils/colors";
import { GetGraphOptionsProps } from "./types";

export default function getDonutOptions({data, colors = [], height = "400px", title = "", subtitle = ""}: GetGraphOptionsProps) {
  const _data = data.map((d) => ({ name: d.value, y: d.count }));
  return {
    chart: {
      type: 'pie',
      height: height,
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            '{point.percentage:.1f} %'
    },
    title: { text: title },
      subtitle: {
        text: subtitle,
      },
    legend: {
        labelFormatter() {
          const percentage = this.percentage.toFixed(1);
          return `<span>${this.name} </span> (<b>${percentage}%)<br/>`;
        },
      },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,        
      }
    },
    series: [{
        minPointSize: 10,
        innerSize: '40%',
        name: 'type',
        borderRadius: 0,
        data: _data,
        colors: colors?.length ? colors : defaultColors,
    }],
  };
}