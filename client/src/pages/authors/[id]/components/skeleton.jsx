import { Col, Container, Row, Tab, Tabs } from "@dataesr/react-dsfr";
import Skeleton from "../../../../components/skeleton";
import BaseSkeleton from "../../../../components/skeleton/base-skeleton";

export default function PublicationSkeleton() {
  return (
    <Container fluid>
      <Row gutters>
        <Col n="12 md-8">
          <Row gutters>
            <Col n="12">
              <Row className="fr-my-1v">
                <BaseSkeleton height="1.5rem" width="175px" className="fr-mr-1v" />
                <BaseSkeleton height="1.5rem" width="75px" />
              </Row>
              <BaseSkeleton width="100%" height="2rem" className="fr-my-1v" />
              <BaseSkeleton width="40%" height="2rem" className="fr-my-1v" />
              <BaseSkeleton width="100%" height="1.5rem" className="fr-my-1v" />
              <BaseSkeleton width="25%" height="1.5rem" className="fr-my-1v" />
            </Col>
            <Col n="12">
              <BaseSkeleton width="40%" height="2rem" className="fr-my-3w" />
              <BaseSkeleton width="100%" height="6rem" className="fr-my-3w" />
            </Col>
          </Row>
          <Row className="fr-my-5w">
            <Tabs>
              <Tab className='more-like-this' label="Publications" icon="ri-link">
                <Skeleton header={false} />
              </Tab>
            </Tabs>
          </Row>
        </Col>
        <Col n="offset-lg-1 md-4 lg-3">
          <Row gutters>
            <Col n="12">
              <div className="skeleton-sm fr-mb-2w" />
              <div className="skeleton-h-lg fr-mb-1v" />
            </Col>
            <Col n="12">
              <hr />
              <div className="skeleton-sm fr-mb-2w" />
              <div className="skeleton-h-lg fr-mb-1v" />
            </Col>
            <Col n="12">
              <hr />
              <div className="skeleton-sm fr-mb-2w" />
              <div className="skeleton-h-lg fr-mb-1v" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}