import { Container } from "@dataesr/dsfr-plus"
import useEvolution from "../../hooks/useEvolution"
import { rangeArray } from "../../../../utils/helpers"
import { useIntl } from "react-intl"
import AnalyticsGraph from "../../../../components/analytics-graph"
import useTrends from "../../hooks/useTrends"

function LineChart({ data, source }) {
  const intl = useIntl()
  const {
    trendsYears: { min, max },
  } = useEvolution()
  const range = rangeArray(min, max)

  if (!data) return null

  const highchartsOptions = {
    chart: {
      type: "line",
      height: "500px",
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
    series: Object.values(data).map((d: any) => ({
      name: d.label,
      data: range.map((year) => d?.count?.[year] || 0),
      marker: { enabled: false },
    })),
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

export default function TrendsEvolutionChart() {
  const { trends: evolution } = useEvolution()
  const { trends } = useTrends()

  console.log("evolution", evolution)
  console.log("trends", trends)

  return <Container className="fr-mt-5w">{<LineChart data={evolution} source="publications" />}</Container>
}
