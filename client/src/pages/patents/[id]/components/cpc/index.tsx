import { Patent } from "../../../../../types/patent";
import { Badge } from "@dataesr/dsfr-plus";

export default function PatentCPC({ cpc }: { cpc: Patent["cpc"] }) {
  if (!cpc.ss_classe) return null;

  const ssClasseItems = cpc.ss_classe;

  return (
    <ul className="fr-badges-group">
      {ssClasseItems.map((el, index) => (
        <li key={index}>
          <Badge
            color="purple-glycine"
            aria-describedby={`tooltip-${index}`}
            as="a"
            href={`/search/patents?q=${el.code}`}
          >
            {el.code}
          </Badge>
          <span
            className="fr-tooltip fr-placement"
            id={`tooltip-${index}`}
            role="tooltip"
            aria-hidden="true"
          >
            {el.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
