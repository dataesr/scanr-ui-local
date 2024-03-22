import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export type OpenAccessDonutProps = {
  percentage: number;
  height?: string;
};

export default function OpenAccessDonut({ percentage, height = '200px' }: OpenAccessDonutProps) {
  const options = {
    chart: {
      height,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: `${percentage}%`,
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '2rem',
        fontFamily: 'Marianne',
      }
    },
    tooltip: {
      pointFormat: 'Taux: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
      }
    },
    colors: ['var(--background-contrast-success-active)', 'var(--text-mention-grey)'],
    series: [{
      type: 'pie',
      innerSize: '65%',
      data: [
        ['Accès ouvert', percentage],
        ['Accès fermé', 100 - percentage],
      ]
    }]
  };
  return (
    <div style={{ maxHeight: '250px' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}