import { colors as defaultColors } from "../utils/colors";
import { GetGraphOptionsProps } from "./types";

type GetYearChartOptionsProps = {
  name?: string;
} & GetGraphOptionsProps;

export default function getYearChartOptions({data, colors = [], height = "250px", title = "", subtitle = "", name = 'Nombre'}: GetYearChartOptionsProps) {
  const _data = data.map((d) => ({ name: d.value, y: d.count }));
  return {
    chart: {
      height,
    },
    title: { text: title },
    subtitle: { text: subtitle },
    xAxis: {
      type: 'category',
      crosshair: true,
      accessibility: {
        description: 'Années'
      }
    },
    yAxis: {
      endofTick: true,
      min: 0,
      max: Math.max(..._data.map(d => d.y)),
      opposite: true,
      crosshair: true,
      accessibility: {
        description: 'Nombre'
      },
      title: { enabled: false },
    },
    colors: colors?.length ? colors : defaultColors,
    legend: { enabled: false },
    series: [{
        type: 'column',
        data: _data,
        name,
        pointPadding: 0.2,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
      }
    ]
  };
}