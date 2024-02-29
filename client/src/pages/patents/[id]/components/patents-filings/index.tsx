import { Patent } from "../../../../../types/patent";
import { useIntl } from "react-intl";
import { Badge, Col, Link, Row, Text, useDSFRConfig } from "@dataesr/dsfr-plus";
import geo from "../../locales/fr.json";
console.log(geo);

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  year: "numeric",
  month: "long",
};

export default function PatentFilings({ data }: { data: Patent }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  const patents = data.patents;
  if (!patents) return null;

  return (
    <Row>
      <Col xs="12">
        {patents.map((patent) => (
          <div key={patent.id} style={{ marginBottom: "20px" }}>
            {patent.isPriority && (
              <>
                <Badge color="green-archipel" style={{ marginRight: "10px" }}>
                  {intl.formatMessage({
                    id: "patents.section.family.priority",
                  })}
                </Badge>
                <span style={{ marginRight: "5px" }}>&gt;</span>
              </>
            )}
            <Badge
              color={geo[patent.office] === "FR" ? "blue-ecume" : "pink-tuile"}
              style={{ marginRight: "10px" }}
            >
              {geo[patent.office]}
            </Badge>

            <Row className="fr-mt-3v">
              <Text className="fr-card__detail" size="sm">
                <i>
                  {intl.formatMessage({
                    id: "patents.section.family.filing.first.publication",
                  })}{" "}
                  {patent.links[0].url.match(/pn%3D%22([^%]*)/)[1]}
                  <br />
                  {intl.formatMessage({
                    id: "patents.section.family.applicationDate",
                  })}{" "}
                  {new Date(patent.applicationDate).toLocaleDateString(
                    locale,
                    options
                  )}{" "}
                  <span>|</span>{" "}
                  {intl.formatMessage({
                    id: "patents.section.family.publicationDate",
                  })}{" "}
                  {new Date(patent.publicationDate).toLocaleDateString(
                    locale,
                    options
                  )}{" "}
                  <span>|</span>{" "}
                  {intl.formatMessage({
                    id: "patents.section.family.filing.number",
                  })}{" "}
                  {patent.publicationNumber}
                </i>
              </Text>
            </Row>
            <Row horizontalAlign="right" className="fr-mb-1w">
              <Text className="fr-card__detail" size="sm">
                <Link
                  href={patent.links[0].url}
                  target="_blank"
                  style={{ marginLeft: "10px" }}
                >
                  {intl.formatMessage({
                    id: "patents.section.family.link",
                  })}
                </Link>
              </Text>
            </Row>
            <hr />
          </div>
        ))}
      </Col>
    </Row>
  );
}
