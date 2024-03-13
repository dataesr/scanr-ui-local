import { Row, Col, Text } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";

function Bullet({ color, text }: { color: string, text }) {
  return (
    <Row verticalAlign="middle">
      <div style={{
        width: ".75rem",
        height: ".75rem",
        backgroundColor: color,
        marginRight: ".5rem",
        borderRadius: "50%",
      }}
      />
      <Text size="sm" className="fr-mb-0">{text}</Text>
    </Row>
  );
}

export default function MapLegend() {
  const intl = useIntl();
  return (
    <Row className="fr-mt-1w fr-ml-1w">
      <Col xs={12}>
        <Bullet color="gray" text={intl.formatMessage({
          id: "patents.section.map.legend.noCountries",
        })} />
      </Col>
      <Col xs={12}>
        <Bullet color="#E18B76" text={
          intl.formatMessage({
            id: "patents.section.map.legend.WO",
          })
        } />
      </Col>
      <Col xs={12}>
        <Bullet color="#465F9D" text={
          intl.formatMessage({
            id: "patents.section.map.legend.EP",
          })
        } />
      </Col>
      <Col xs={12}>
        <Bullet color="#e6feda" text={
          intl.formatMessage({
            id: "patents.section.map.legend.EA",
          })
        } />
      </Col>
      <Col xs={12}>
        <Bullet color="#C8AA39" text={
          intl.formatMessage({
            id: "patents.section.map.legend.AP",
          })
        } />
      </Col>
    </Row>
  );
}
