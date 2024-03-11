import { Patent } from "../../../../../types/patent";
import { Badge, Col, Text } from "@dataesr/dsfr-plus";

export default function PatentCPC({ data }: { data: Patent }) {
  if (!data) return null;

  const ssClasseItems = data.domains.filter((el) => el.level === "ss_classe");

  return (
    <Col className="fr-mb-3w">
      <Text>
        <ul className="fr-badges-group">
          {ssClasseItems.map((el, index) => (
            <>
              <Badge
                color="purple-glycine"
                aria-describedby={`tootip-${index}`}
                as="a"
                href={`/${el.code}`}
              >
                {el.code}
              </Badge>
              <span
                className="fr-tooltip fr-placement"
                id={`tootip-${index}`}
                role="tooltip"
                aria-hidden="true"
              >
                {el.label.default}
              </span>
            </>
          ))}
        </ul>
      </Text>
    </Col>
  );
}
