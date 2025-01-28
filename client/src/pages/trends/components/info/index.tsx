import { Container, Text } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { useIntl } from "react-intl"

export default function TrendsViewInfo() {
  const intl = useIntl()
  const { trends, isFetching } = useTrends()

  if (isFetching) return null

  const topicsCount = trends?.pages?.[0]?.searchTotal || 0
  const publicationsCount = trends?.pages?.[0]?.sourceCount || 0

  console.log("trends", trends)

  return (
    <Container>
      <Text className="fr-mb-1w">
        {intl.formatMessage({ id: "trends.ranking.info.text" }, { topics: topicsCount, publications: publicationsCount })}
      </Text>
    </Container>
  )
}
