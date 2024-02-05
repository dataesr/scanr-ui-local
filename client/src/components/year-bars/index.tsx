import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export type YearBarsProps = {
  years: string[];
  counts: number[];
  height?: string;
  name: string;
};

export default function YearBars({ years, counts, name, height = '150px' }: YearBarsProps) {
  const options = {
    chart: {
      type: 'column',
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height,
    },
    credits: {
      enabled: false
    },
    title: {
      text: null,
    },
    accessibility: {
      description: 'Nombre par année'
    },
    xAxis: {
      type: 'category',
      categories: years,
      crosshair: true,
      accessibility: {
        description: 'Années'
      }
    },
    yAxis: {
      endofTick: true,
      min: 0,
      max: Math.max(...counts),
      opposite: true,
      style: {
        fontFamily: 'Marianne',
      },
      crosshair: true,
      title: {
        enabled: false,
      },
      accessibility: {
        description: 'Nombre'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      }
    },
    colors: ['var(--artwork-minor-purple-glycine)'],
    legend: { enabled: false },
    series: [
      {
        name,
        data: counts
      }
    ]
  }
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}