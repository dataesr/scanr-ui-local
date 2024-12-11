import { useIntl } from "react-intl"
import AnalyticsGraph from "../../../../components/analytics-graph"
import { rangeArray } from "../../../../utils/helpers"
import useTrends from "../../hooks/useTrends"

export default function LineChart({ data, source }) {
  const intl = useIntl()
  const {
    trendsYears: { min, max },
  } = useTrends()
  const range = rangeArray(min, max)

  const _data = range.map((year) => data?.count?.[year] || 0)
  const _reg = range.map((_, index) => index * data.slope + data.intercept)

  if (!_data) return null

  const highchartsOptions = {
    chart: {
      type: "line",
      height: "350px",
    },
    xAxis: {
      accessibility: {
        description: intl.formatMessage({ id: "trends.line-chart.xAxis.accessibility.description" }, { min: min, max: max }),
      },
      tickInterval: 1, // one year
    },
    yAxis: {
      accessibility: {
        description: intl.formatMessage(
          { id: "trends.line-chart.yAxis.accessibility.description" },
          {
            source: intl.formatMessage({ id: `trends.select-source.${source}` }).toLowerCase(),
          }
        ),
      },
      title: {
        text: intl.formatMessage(
          { id: "trends.line-chart.yAxis.title.text" },
          {
            source: intl.formatMessage({ id: `trends.select-source.${source}` }).toLowerCase(),
          }
        ),
      },
    },
    plotOptions: {
      series: {
        pointStart: min,
        pointInterval: 1, // one year
      },
    },
    legend: { enabled: true },
    series: [
      {
        name: data.label,
        data: _data,
        marker: { enabled: true },
        color: "#0078f3",
      },
      {
        name: intl.formatMessage({ id: "trends.line-chart.series.regression.name" }),
        data: _reg,
        marker: { enabled: false },
        dashStyle: "dash",
        color: "grey",
        enableMouseTracking: false,
      },
    ],
  }

  return (
    <AnalyticsGraph
      title={intl.formatMessage({ id: "trends.line-chart.title" }, { label: data.label })}
      description={intl.formatMessage(
        { id: `trends.line-chart.description.${source}` },
        {
          label: data.label,
        }
      )}
      options={highchartsOptions}
    />
  )
}
