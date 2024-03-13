import { Patent } from "../../../../../types/patent";
import { Badge } from "@dataesr/dsfr-plus";

export default function PatentCPC({ domains }: { domains: Patent["domains"] }) {
  if (!domains.length) return null;

  const ssClasseItems = domains.filter((el) => el.level === "ss_classe");

  return (
    <ul className="fr-badges-group">
      {ssClasseItems.map((el, index) => (
        <>
          <Badge
            color="purple-glycine"
            aria-describedby={`tootip-${index}`}
            as="a"
            href={`/search/patents?q=${el.code}`}
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

  );
}
