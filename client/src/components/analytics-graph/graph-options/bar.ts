import { colors as defaultColors } from "../utils/colors";
import { GetGraphOptionsProps } from "./types";

export default function getBarChartOptions({data, colors = [], height = "auto", title = "", subtitle = ""}: GetGraphOptionsProps) {
  const _data = data.map((d) => ({ name: d.label || d.value, y: d.count }));
  if (height === "auto") {
    height = `${_data.length * 30}px`;
  }
  
  return {
    chart: {
      height,
      margin: [0, 0, 0, 0],

    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      type: 'category',
      visible: false,
      title: { enabled: false },
      labels: { enabled: false },
      tickLength: 0,
      crossair: true,
    },
    yAxis: {
      visible: false,
      title: { enabled: false },
      labels: { enabled: false },
      tickLength: 0,
    },
    colors: colors?.length ? colors : defaultColors,
    legend: { enabled: false },
    series: [{
        type: 'bar',
        data: _data,
        pointPadding: 0.2,
        groupPadding: 0,
        dataLabels: {
					// verticalAlign: 'top',
					align: 'left',
					inside: true,
          enabled: true,
          format: '{point.name} ({point.y})'
        },
      }
    ]
  };
}