import { useState } from "react";
import { Patent } from "../../../../../types/patent";
import { Col, Link, Text } from "@dataesr/dsfr-plus";

export default function PatentCPC({ data }: { data: Patent }) {
  const [showMore, setShowMore] = useState(false);

  if (!data) return null;

  const ssClasseItems = data.domains.filter((el) => el.level === "ss_classe");
  const ssClasseCount = ssClasseItems.length;

  return (
    <Col className="fr-mb-3w">
      <Text>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {ssClasseItems
            .slice(0, showMore ? ssClasseCount : 4)
            .map((el, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "0.5rem",
                  marginRight: "0.5rem",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                }}
              >
                <span
                  title={el.label.default}
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Link
                    href={`/${el.code}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {el.code}
                  </Link>
                </span>
              </li>
            ))}
        </ul>
        {ssClasseCount > 4 && (
          <div>
            {!showMore ? (
              <button
                className="fr-consent-service__collapse-btn"
                aria-expanded="false"
                aria-describedby="share-legend"
                aria-controls="share-collapse"
                onClick={() => setShowMore(true)}
                style={{
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Voir plus
              </button>
            ) : (
              <button
                className="fr-consent-service__collapse-btn"
                aria-expanded="false"
                aria-describedby="share-legend"
                aria-controls="share-collapse"
                onClick={() => setShowMore(false)}
                style={{
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Voir moins
              </button>
            )}
          </div>
        )}
      </Text>
    </Col>
  );
}
