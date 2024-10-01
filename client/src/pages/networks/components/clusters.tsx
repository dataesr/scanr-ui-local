import React, { Fragment, useState } from "react"
import { useIntl } from "react-intl"
import { Container, Row, Button, Badge, BadgeGroup, Link, Text, Col } from "@dataesr/dsfr-plus"
// import Gauge from "../../../components/gauge"
import { PageSection } from "../../../components/page-content"
import { NetworkCommunity, NetworkData } from "../../../types/network"
import useSearchData from "../hooks/useSearchData"
import BaseSkeleton from "../../../components/skeleton/base-skeleton"
import { encode } from "../../../utils/string"

const SEE_MORE_AFTER = 5

type ClusterItemArgs = {
  currentTab: string
  community: NetworkCommunity
  setFocusItem: React.Dispatch<React.SetStateAction<string>>
}
type ClustersSectionArgs = {
  currentTab: string
  enabled: boolean
  setFocusItem: React.Dispatch<React.SetStateAction<string>>
}

function ClusterItem({ currentTab, community, setFocusItem }: ClusterItemArgs) {
  const intl = useIntl()
  const currentYear = new Date().getFullYear()
  const oaColor = (percent: number) => (percent >= 40.0 ? (percent >= 70.0 ? "success" : "yellow-moutarde") : "warning")
  return (
    <Container fluid className="cluster-item">
      <Row>
        <Col>
          <BadgeGroup>
            <Badge size="sm" color="purple-glycine">
              {`${community.size} ${intl.formatMessage({ id: `networks.header.tab.${currentTab}` })}`}
            </Badge>
            <Badge size="sm" color="pink-macaron">
              {`${community.publicationsCount} ${intl.formatMessage({
                id: "networks.section.clusters.badge-publications",
              })}`}
            </Badge>
            <Badge noIcon size="sm" color={oaColor(community.oaPercent)}>
              {`${intl.formatMessage({ id: "networks.section.clusters.open-access" })}: ${community.oaPercent.toFixed(1)}%`}
            </Badge>
            <Badge size="sm" color="yellow-tournesol">
              {`${intl.formatMessage({ id: "networks.section.clusters.last-activity" })}: ${community.maxYear}`}
            </Badge>
            <Badge size="sm" color="blue-cumulus">{`${intl.formatMessage(
              { id: "networks.section.clusters.citations" },
              { count: community.citationsByYear?.[currentYear] }
            )} (${currentYear})`}</Badge>
          </BadgeGroup>
        </Col>
      </Row>
      <Row>
        <div style={{ alignContent: "center", paddingRight: "0.5rem", color: `${community.color}` }}>{"█"} </div>
        <Button variant="text" className="fr-link" onClick={() => setFocusItem(community.maxWeightNodes[0])}>
          {community.label}
        </Button>
      </Row>
      <Text size="sm" className="fr-mb-0">
        <i>{community.topWeightNodes?.join(", ")}</i>
        <i>{community.size > community.topWeightNodes.length ? ", ..." : "."}</i>
      </Text>
      <Text bold size="sm" className="fr-mb-0">
        {community?.domains
          ? Object.entries(community.domains)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 10)
              .map(([domain], k) => (
                <Fragment key={k}>
                  {k > 0 ? ", " : ""}
                  <Link href={`/search/publications?q="${encode(domain)}"`}>#{domain}</Link>
                </Fragment>
              ))
          : null}
      </Text>
    </Container>
  )
}

export default function ClustersSection({ currentTab, enabled, setFocusItem }: ClustersSectionArgs) {
  const intl = useIntl()
  const { search, currentQuery } = useSearchData(currentTab, enabled)
  const [seeMore, setSeeMore] = useState(false)
  const network = search?.data?.network as NetworkData
  const communities = network?.clusters
  const sectionTitle = `networks.section.clusters.${currentTab}`

  if (!currentQuery || !enabled) return null

  if (search.isFetching)
    return (
      <Container fluid className="fr-mt-5w">
        <BaseSkeleton width="100%" height="30rem" className="fr-my-1v" />
      </Container>
    )

  return (
    <Container fluid className="fr-mt-5w">
      <PageSection
        size="lead"
        show={true}
        title={intl.formatMessage({ id: sectionTitle }, { count: communities?.length })}
        icon="shapes-line"
      >
        <>
          <div className="cluster-list">
            {communities?.slice(0, seeMore ? communities?.length + 1 : SEE_MORE_AFTER)?.map((community, index) => (
              <ClusterItem key={index} currentTab={currentTab} community={community} setFocusItem={setFocusItem} />
            ))}
          </div>
          {communities?.length > SEE_MORE_AFTER ? (
            <Row horizontalAlign="right">
              <Button variant="secondary" size="sm" onClick={() => setSeeMore((prev: boolean) => !prev)}>
                {seeMore
                  ? intl.formatMessage({ id: "networks.section.clusters.see-less" })
                  : intl.formatMessage(
                      { id: "networks.section.clusters.see-more" },
                      { count: communities?.length - SEE_MORE_AFTER }
                    )}
              </Button>
            </Row>
          ) : null}
        </>
      </PageSection>
    </Container>
  )
}
