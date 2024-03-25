export default function getOaChartOptions({ data, height = "250px", title = "", subtitle = "", name = "OA" }) {
  const _data = data.map((d) => ({ name: d.label, y: d.oaPercent, color: d.color }))
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
        description: "Communities",
      },
    },
    yAxis: {
      endofTick: true,
      min: 0,
      max: Math.max(..._data.map((d) => d.y)),
      opposite: true,
      crosshair: true,
      accessibility: {
        description: "Percentage",
      },
      title: { enabled: false },
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="font-size:10px">{point.name}</span><br/><span style="color:{point.color}">\u25CF</span> \
        {series.name}: <b>{point.y:.1f} %</b>',
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
