import AnalyticsGraph from "../../../../components/analytics-graph"

export default function LineChart({ data }) {
  console.log("line chart data", data)

  const regression = Object.keys(data.count).map((key) => Number(key) * data.slope + data.intercept)
  console.log("line chart regression", regression)

  const highchartsOptions = {
    chart: {
      type: "line",
    },
    xAxis: {
      accessibility: {
        description: "Range: 2018 to 2023",
      },
    },
    yAxis: {
      accessibility: {
        description: "Fraction of publications",
      },
      title: { text: "Fraction of publications" },
    },
    plotOptions: {
      series: {
        pointStart: 2018,
        pointInterval: 2, // one year
      },
    },
    legend: { enabled: true },
    series: [
      {
        name: data.label,
        data: Object.values(data.norm),
        marker: { enabled: true },
      },
      {
        name: "linear regression",
        data: regression,
        marker: { enabled: false },
        dashStyle: "dash",
        color: "grey",
        events: null,
      },
    ],
  }

  return (
    <AnalyticsGraph
      title={`Evolution over time for '${data.label}'`}
      description={`Fraction of publications per year where '${data.label}' was detected`}
      options={highchartsOptions}
    />
  )
}
