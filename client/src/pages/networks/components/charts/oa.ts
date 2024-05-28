export default function getOaChartOptions({ data, height = "400px", title = "", subtitle = "", name = "OA" }) {
  const _data = data.map((d) => ({ name: d.label, y: d.oaPercent, color: d.color }))
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
      crosshair: true,
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
          width: "200%",
        },
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
        pointPadding: 0.4,
        groupPadding: 0,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  }
}
