export default function getHorizontalBarChartOptions({
  data,
  x,
  y,
  unit = "",
  height = "300px",
  title = "",
  subtitle = "",
  name = "",
}) {
  const _data = data.map((d) => ({ name: d[x], y: d[y], color: d.color }))
  const isFloat = (n: any) => Number(n) === n && n % 1 !== 0
  return {
    chart: {
      type: "bar",
      marginLeft: 0,
      height,
    },
    title: { text: title },
    subtitle: { text: subtitle },
    xAxis: {
      type: "category",
      accessibility: {
        description: "Communities",
      },
      labels: {
        x: 0,
        y: -10,
        align: "left",
        style: {
          witeSpace: "nowrap",
          textOverflow: "ellipsis",
          width: "300%",
        },
        formatter() {
          const points = this.chart.userOptions.series[0].data
          const y = points.filter((point) => point.name === this.value)[0]?.y
          return `${this.value} (${isFloat(y) ? y.toFixed(1) : y}${unit})`
        },
      },
    },
    yAxis: {
      endofTick: true,
      min: 0,
      max: Math.max(..._data.map((d) => d.y)),
      gridLineWidth: 0,
      accessibility: {
        description: name ?? y,
      },
      labels: { enabled: false },
      title: { enabled: false },
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: _data.map((d) => d.color),
    legend: { enabled: false },
    tooltip: { enabled: false },
    series: [
      {
        type: "column",
        data: _data,
        name: name ?? "Elements",
        pointPadding: 0.4,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  }
}
