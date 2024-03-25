export default function getSizeChartOptions({ data, height = "250px", title = "", subtitle = "", name = "Elements" }) {
  const _data = data.map((d) => ({ name: d.label, y: d.size, color: d.color }))
  return {
    chart: {
      height,
    },
    title: { text: title },
    subtitle: { text: subtitle },
    xAxis: {
      type: "category",
      crosshair: true,
      accessibility: {
        description: "Clusters",
      },
    },
    yAxis: {
      endofTick: true,
      min: 0,
      max: Math.max(..._data.map((d) => d.y)),
      opposite: true,
      crosshair: true,
      accessibility: {
        description: "Size",
      },
      title: { enabled: false },
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    colors: _data.map((d) => d.color),
    legend: { enabled: false },
    series: [
      {
        type: "column",
        data: _data,
        name,
        pointPadding: 0.2,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  }
}
