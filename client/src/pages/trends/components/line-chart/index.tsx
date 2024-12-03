import { useIntl } from "react-intl"
import AnalyticsGraph from "../../../../components/analytics-graph"
import { MAX_YEAR, MIN_YEAR, YEARS } from "../../config/years"

export default function LineChart({ data, normalized, source }) {
  const intl = useIntl()

  const _data = YEARS.map((year) => data?.[normalized ? "norm" : "count"]?.[year] || 0)
  const _reg = YEARS.map((year) => Number(year) * (normalized ? data.slope * data.sum : data.slope) + data.intercept)

  if (!_data) return null

  const highchartsOptions = {
    chart: {
      type: "line",
    },
    xAxis: {
      accessibility: {
        description: intl.formatMessage(
          { id: "trends.line-chart.xAxis.accessibility.description" },
          { min: MIN_YEAR, max: MAX_YEAR }
        ),
      },
    },
    yAxis: {
      accessibility: {
        description: intl.formatMessage(
          { id: `trends.line-chart.yAxis.accessibility.description${normalized ? "-normalized" : ""}` },
          {
            source: intl.formatMessage({ id: `trends.select-source.${source}` }).toLowerCase(),
          }
        ),
      },
      title: {
        text: intl.formatMessage(
          { id: `trends.line-chart.yAxis.title.text${normalized ? "-normalized" : ""}` },
          {
            source: intl.formatMessage({ id: `trends.select-source.${source}` }).toLowerCase(),
          }
        ),
      },
    },
    plotOptions: {
      series: {
        pointStart: MIN_YEAR,
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
        events: null,
      },
    ],
  }

  return (
    <AnalyticsGraph
      title={intl.formatMessage({ id: "trends.line-chart.title" }, { label: data.label })}
      description={intl.formatMessage(
        { id: `trends.line-chart.description${normalized ? "-normalized" : ""}` },
        {
          label: data.label,
          source: intl.formatMessage({ id: `trends.select-source.${source}` }).toLowerCase(),
        }
      )}
      options={highchartsOptions}
    />
  )
}
