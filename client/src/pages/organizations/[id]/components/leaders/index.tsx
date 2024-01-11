import cs from "classnames";
import { Row, Col, Text, Link } from "@dataesr/dsfr-plus";
import { OrganizationLeaderData } from "../../../../../api/types/organization";

function Leader({ leader }: { leader: OrganizationLeaderData }) {
  return (
    <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!leader.person })}>
      <div className="author-avatar fr-mr-2w fr-icon-user-line" />
      <div style={{ flexGrow: 1, display: "block" }}>
        <Text className="fr-card__detail" size="sm">
          <i>{leader.role}</i>
        </Text>
        <Text className="fr-m-0">
          {
            leader.person ? (
              <Link href={`/authors/${leader.person}`}>
                {leader.firstName}
                {' '}
                {leader.lastName}
              </Link>
            ) : (<>{leader.firstName}
              {' '}
              {leader.lastName}</>)
          }
        </Text>
      </div>
    </div>
  )
}

export default function OrganizationLeaders({ data: leaders }: { data: OrganizationLeaderData[] }) {
  if (!leaders?.length) return null;
  return (
    <>
      <Row gutters>
        {leaders?.filter(l => l.role === "Directeur")?.map((leader) => (
          <Col xs="12" md="6">
            <Leader leader={leader} />
          </Col>
        ))}
      </Row>
      <Row gutters>
        {leaders?.filter(l => l.role !== "Directeur")?.map((leader) => (
          <Col xs="12" md="6">
            <Leader leader={leader} />
          </Col>
        ))}
      </Row>
    </>
  )
}