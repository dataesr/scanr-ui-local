import { Fragment } from "react"
import { useIntl } from "react-intl"
import { Container, Row, Button, Badge, BadgeGroup, Link, Text, Col } from "@dataesr/dsfr-plus"
import Modal from "../../../components/modal"
// import Gauge from "../../../components/gauge"
import { PageSection } from "../../../components/page-content"
import { NetworkCommunity, NetworkData } from "../../../types/network"
import useSearchData from "../hooks/useSearchData"
import BaseSkeleton from "../../../components/skeleton/base-skeleton"
import { encode } from "../../../utils/string"

const ndisplay = 5

function ClusterItem({
  currentTab,
  community,
  setFocusItem,
}: {
  currentTab: string
  community: NetworkCommunity
  setFocusItem: any
}) {
  const intl = useIntl()
  const oaColor = (percent: number) => (percent >= 40.0 ? (percent >= 70.0 ? "success" : "yellow-moutarde") : "warning")
  return (
    <Container fluid className="cluster-item">
      <Row>
        <Col>
          <BadgeGroup>
            <Badge size="sm" color="purple-glycine">
              {`${community.size} ${currentTab}`}
            </Badge>
            <Badge size="sm" color="pink-macaron">
              {`${community.hits} publications`}
            </Badge>
            <Badge noIcon size="sm" color={oaColor(community.oaPercent)}>
              {`${intl.formatMessage({ id: "networks.section.clusters.open-access" })}: ${community.oaPercent.toFixed(1)}%`}
            </Badge>
            <Badge size="sm" color="yellow-tournesol">
              {`${intl.formatMessage({ id: "networks.section.clusters.last-activity" })}: ${community.maxYear}`}
            </Badge>
          </BadgeGroup>
        </Col>
        {/* <Col>
          <Gauge label="open access: " percent={community.oaPercent} color="#34CB6A" />
        </Col> */}
      </Row>
      <Row>
        <div style={{ alignContent: "center", paddingRight: "0.5rem", color: `${community.color}` }}>{"█"} </div>
        <Button variant="text" className="fr-link" onClick={() => setFocusItem(community.maxWeightNodes[0])}>
          {community.label}
        </Button>
      </Row>
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

export default function ClustersSection({
  currentTab,
  enabled,
  setFocusItem,
}: {
  currentTab: string
  enabled: boolean
  setFocusItem: any
}) {
  const intl = useIntl()
  const { search } = useSearchData(currentTab, enabled)
  const network = search?.data?.network as NetworkData
  const communities = network?.clusters
  const sectionTitle = `networks.section.clusters.${currentTab}`

  if (!enabled) return null

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
            {communities?.slice(0, ndisplay)?.map((community, index) => (
              <ClusterItem key={index} currentTab={currentTab} community={community} setFocusItem={setFocusItem} />
            ))}
          </div>
          {communities?.length > ndisplay ? (
            <Row horizontalAlign="right">
              <Button
                variant="secondary"
                icon="arrow-right-s-line"
                iconPosition="right"
                aria-controls={sectionTitle}
                data-fr-opened="false"
              >
                {intl.formatMessage({ id: "networks.section.clusters.open-modal-button" })}
              </Button>
            </Row>
          ) : null}
          {communities?.length > 3 ? (
            <Modal
              id={sectionTitle}
              size="lg"
              title={intl.formatMessage({ id: sectionTitle }, { count: communities.length })}
            >
              <div className="cluster-list">
                {communities?.map((community, index) => (
                  <ClusterItem key={index} currentTab={currentTab} community={community} setFocusItem={setFocusItem} />
                ))}
              </div>
            </Modal>
          ) : null}
        </>
      </PageSection>
    </Container>
  )
}
