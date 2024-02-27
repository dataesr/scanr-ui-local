import { Patent } from "../../../../../types/patent";
import { Link, Text } from "@dataesr/dsfr-plus";

export default function PatentFamily({ data }: { data: Patent }) {
  if (!data) return null;

  return (
    <div className="fr-mb-3w" style={{ display: "flex", flexWrap: "wrap" }}>
      {data.patents.map((el) => (
        <div
          key={el.id}
          style={{
            backgroundColor: "var(--background-alt-purple-glycine)",
            padding: "20px",
            marginRight: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text
            className="fr-m-0"
            bold
            style={{ fontSize: "1.5rem", marginBottom: "10px" }}
          >
            {el.id}
          </Text>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "0",
              marginTop: "10px",
            }}
          >
            <li>
              <Link
                className="fr-link--icon-right"
                href={el.links.length > 0 ? el.links[0].url : "#"}
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <span>{el.id}</span>
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "1rem",
                    color: "#aaa",
                  }}
                >
                  &rarr;
                </span>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
