import { Col, Container, Row } from "@dataesr/dsfr-plus";
import BaseSkeleton from "./base-skeleton";

export default function PageSkeleton() {
  return (
    <Container fluid>
      <Row gutters>
        <Col xs="12" md="8">
          <Row gutters>
            <Col xs="12">
              <Row className="fr-my-1v">
                <BaseSkeleton height="1.5rem" width="175px" className="fr-mr-1v" />
                <BaseSkeleton height="1.5rem" width="75px" />
              </Row>
              <BaseSkeleton width="100%" height="2rem" className="fr-my-1v" />
              <BaseSkeleton width="40%" height="2rem" className="fr-my-1v" />
              <BaseSkeleton width="100%" height="1.5rem" className="fr-my-1v" />
              <BaseSkeleton width="25%" height="1.5rem" className="fr-my-1v" />
            </Col>
            <Col xs="12">
              <BaseSkeleton width="40%" height="2rem" className="fr-my-3w" />
              <BaseSkeleton width="100%" height="6rem" className="fr-my-3w" />
            </Col>
            <Col xs="12">
              <BaseSkeleton width="40%" height="2rem" className="fr-my-3w" />
              <BaseSkeleton width="100%" height="6rem" className="fr-my-3w" />
            </Col>
            <Col xs="12">
              <BaseSkeleton width="40%" height="2rem" className="fr-my-3w" />
              <BaseSkeleton width="100%" height="6rem" className="fr-my-3w" />
            </Col>
          </Row>
        </Col>
        <Col xs="12" md="4" lg="3" offsetLg="1">
          <Row gutters>
            <Col xs="12">
              <div className="skeleton-sm fr-mb-2w" />
              <div className="skeleton-h-lg fr-mb-1v" />
            </Col>
            <Col xs="12">
              <hr />
              <div className="skeleton-sm fr-mb-2w" />
              <div className="skeleton-h-lg fr-mb-1v" />
            </Col>
            <Col xs="12">
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