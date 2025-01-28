import { Container, Text } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { useIntl } from "react-intl"

export default function TrendsViewInfo() {
  const intl = useIntl()
  const { trends } = useTrends()

  const topicsCount = trends?.searchTotal || 0
  const publicationsCount = trends?.sourceCount || 0

  return (
    <Container>
      <Text className="fr-mb-1w">
        {intl.formatMessage({ id: "trends.ranking.info.text" }, { topics: topicsCount, publications: publicationsCount })}
      </Text>
    </Container>
  )
}
