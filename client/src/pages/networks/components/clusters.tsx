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

function ClusterItem({ currentTab, community }: { currentTab: string; community: NetworkCommunity }) {
  const intl = useIntl()
  const oaColor = (percent: number) => (percent >= 40.0 ? (percent >= 70.0 ? "success" : "yellow-moutarde") : "warning")
  return (
    <Container fluid className="result-item">
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
        {/* <Col className="fr-badge fr-badge--sm fr-badge--brown-opera">
          <Gauge label="open access: " percent={community.oaPercent} color="#34CB6A" />
        </Col> */}
      </Row>
      <Link className="fr-link">{community.label}</Link>
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

export default function ClustersSection({ currentTab, enabled }: { currentTab: string; enabled: boolean }) {
  const intl = useIntl()
  const { search } = useSearchData(currentTab, enabled)
  const network = search?.data?.network as NetworkData
  const communities = network?.clusters
  const sectionTitle = `networks.section.clusters.${currentTab}`

  if (!enabled) return null

  if (search.isFetching) return <BaseSkeleton width="100%" height="30rem" className="fr-my-1v" />

  return (
    <Container className="fr-mt-5w">
      <PageSection
        size="lead"
        show={true}
        title={intl.formatMessage({ id: sectionTitle }, { count: communities?.length })}
        icon="shapes-line"
      >
        <>
          <div className="result-list">
            {communities?.slice(0, ndisplay)?.map((community) => (
              <ClusterItem currentTab={currentTab} community={community} />
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
              <div className="result-list">
                {communities?.map((community) => (
                  <ClusterItem currentTab={currentTab} community={community} />
                ))}
              </div>
            </Modal>
          ) : null}
        </>
      </PageSection>
    </Container>
  )
}
