export default function getYearsChartOptions({ data, years = "years", height = "300px", title = "", subtitle = "" }) {
  const _data = data.map((d) => ({ name: d.label, years: d[years], color: d.color }))
  const minYear = Math.min(..._data.flatMap((d) => Object.keys(d.years).map((k) => Number(k))))
  const maxYear = Math.max(..._data.flatMap((d) => Object.keys(d.years).map((k) => Number(k))))
  const maxValue = Math.max(..._data.flatMap((d) => Object.values(d.years)))
  const range = [...Array(maxYear - minYear + 1).keys()].map((y) => y + minYear)

  return {
    chart: {
      type: "spline",
      height,
    },
    title: { text: title },
    subtitle: { text: subtitle },
    xAxis: {
      min: Math.max(2000, range[0]),
      crosshair: true,
      accessibility: {
        description: "Years",
      },
    },
    yAxis: {
      min: 0,
      max: maxValue,
      opposite: true,
      crosshair: true,
      accessibility: {
        description: "Number",
      },
      title: { enabled: false },
    },
    plotOptions: {
      series: {
        marker: { enabled: false },
        pointStart: minYear,
        pointInterval: 1, // one year
      },
    },
    colors: _data.map((d) => d.color),
    legend: { enabled: false },
    series: _data.map((d) => ({
      name: d.name,
      data: range.map((year) => d.years[`${year}`] ?? 0),
    })),
  }
}
